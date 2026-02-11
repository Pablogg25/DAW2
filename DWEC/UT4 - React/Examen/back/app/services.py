"""Business logic for CRUD operations and classification."""

from __future__ import annotations

from datetime import date
from typing import Dict, List

from fastapi import HTTPException, status

from . import data
from .schemas import (
    ClasificacionOut,
    EquipoCreate,
    EquipoOut,
    EquipoUpdate,
    PartidoCreate,
    PartidoOut,
    PartidoUpdate,
)


def list_equipos() -> List[EquipoOut]:
    return [EquipoOut(**e) for e in data.equipos]


def get_equipo_or_404(equipo_id: int) -> EquipoOut:
    equipo = data.find_equipo(equipo_id)
    if not equipo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Equipo no encontrado.")
    return EquipoOut(**equipo)


def create_equipo(payload: EquipoCreate) -> EquipoOut:
    nuevo = payload.model_dump()
    nuevo["equipoId"] = data.get_next_equipo_id()
    data.equipos.append(nuevo)
    return EquipoOut(**nuevo)


def update_equipo(equipo_id: int, payload: EquipoUpdate) -> EquipoOut:
    equipo = data.find_equipo(equipo_id)
    if not equipo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Equipo no encontrado.")
    updates = payload.model_dump(exclude_unset=True)
    equipo.update(updates)
    return EquipoOut(**equipo)


def delete_equipo(equipo_id: int) -> None:
    equipo = data.find_equipo(equipo_id)
    if not equipo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Equipo no encontrado.")
    if any(p["equipoLocalId"] == equipo_id or p["equipoVisitanteId"] == equipo_id for p in data.partidos):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El equipo tiene partidos asociados.")
    data.equipos.remove(equipo)


def list_partidos(inicio: int | None, limite: int | None) -> List[PartidoOut]:
    items = data.partidos
    if inicio is not None and limite is not None:
        items = items[inicio: inicio + limite]
    elif inicio is not None:
        items = items[inicio:]
    elif limite is not None:
        items = items[:limite]
    return [PartidoOut(**p) for p in items]


def get_partido_or_404(partido_id: int) -> PartidoOut:
    partido = data.find_partido(partido_id)
    if not partido:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Partido no encontrado.")
    return PartidoOut(**partido)


def _assert_equipo_exists(equipo_id: int, role: str) -> None:
    if not data.find_equipo(equipo_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Equipo {role} no encontrado.",
        )


def create_partido(payload: PartidoCreate) -> PartidoOut:
    _assert_equipo_exists(payload.equipoLocalId, "local")
    _assert_equipo_exists(payload.equipoVisitanteId, "visitante")
    nuevo = payload.model_dump()
    nuevo["partidoId"] = data.get_next_partido_id()
    data.partidos.append(nuevo)
    return PartidoOut(**nuevo)


def update_partido(partido_id: int, payload: PartidoUpdate) -> PartidoOut:
    partido = data.find_partido(partido_id)
    if not partido:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Partido no encontrado.")
    updates = payload.model_dump(exclude_unset=True)

    # If both teams are being updated, keep the distinct validation.
    local_id = updates.get("equipoLocalId", partido["equipoLocalId"])
    visitante_id = updates.get("equipoVisitanteId", partido["equipoVisitanteId"])
    if local_id == visitante_id:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="El equipo local y visitante deben ser distintos.",
        )
    _assert_equipo_exists(local_id, "local")
    _assert_equipo_exists(visitante_id, "visitante")

    partido.update(updates)
    return PartidoOut(**partido)


def delete_partido(partido_id: int) -> None:
    partido = data.find_partido(partido_id)
    if not partido:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Partido no encontrado.")
    data.partidos.remove(partido)


def get_clasificacion() -> List[ClasificacionOut]:
    # Initialize stats by team id.
    stats: Dict[int, Dict] = {}
    for e in data.equipos:
        stats[e["equipoId"]] = {
            "equipoId": e["equipoId"],
            "nombre": e["nombre"],
            "puntos": 0,
            "victorias": 0,
            "derrotas": 0,
            "partidosJugados": 0,
        }

    for p in data.partidos:
        local = stats[p["equipoLocalId"]]
        visitante = stats[p["equipoVisitanteId"]]
        local["partidosJugados"] += 1
        visitante["partidosJugados"] += 1

        if p["puntosLocal"] > p["puntosVisitante"]:
            local["victorias"] += 1
            visitante["derrotas"] += 1
            local["puntos"] += 2
            visitante["puntos"] += 1
        elif p["puntosLocal"] < p["puntosVisitante"]:
            visitante["victorias"] += 1
            local["derrotas"] += 1
            visitante["puntos"] += 2
            local["puntos"] += 1
        else:
            # Tie: no winner, both get 1 point.
            local["puntos"] += 1
            visitante["puntos"] += 1

    ordered = sorted(stats.values(), key=lambda x: x["puntos"], reverse=True)
    return [ClasificacionOut(**s) for s in ordered]
