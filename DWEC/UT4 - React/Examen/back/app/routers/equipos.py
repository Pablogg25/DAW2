"""Equipos endpoints."""

from __future__ import annotations

from typing import List

from fastapi import APIRouter, status

from ..schemas import EquipoCreate, EquipoOut, EquipoUpdate
from ..services import create_equipo, delete_equipo, get_equipo_or_404, list_equipos, update_equipo


router = APIRouter(prefix="/equipos", tags=["equipos"])


@router.get("", response_model=List[EquipoOut])
def get_equipos() -> List[EquipoOut]:
    return list_equipos()


@router.get("/{equipo_id}", response_model=EquipoOut)
def get_equipo(equipo_id: int) -> EquipoOut:
    return get_equipo_or_404(equipo_id)


@router.post("", response_model=EquipoOut, status_code=status.HTTP_201_CREATED)
def post_equipo(payload: EquipoCreate) -> EquipoOut:
    return create_equipo(payload)


@router.put("/{equipo_id}", response_model=EquipoOut)
def put_equipo(equipo_id: int, payload: EquipoUpdate) -> EquipoOut:
    return update_equipo(equipo_id, payload)


@router.delete("/{equipo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_equipo_endpoint(equipo_id: int) -> None:
    delete_equipo(equipo_id)
    return None
