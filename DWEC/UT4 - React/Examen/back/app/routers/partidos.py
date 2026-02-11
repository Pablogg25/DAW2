"""Partidos endpoints."""

from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Query, status

from ..schemas import PartidoCreate, PartidoOut, PartidoUpdate
from ..services import (
    create_partido,
    delete_partido,
    get_partido_or_404,
    list_partidos,
    update_partido,
)


router = APIRouter(prefix="/partidos", tags=["partidos"])


@router.get("", response_model=List[PartidoOut])
def get_partidos(
    inicio: Optional[int] = Query(None, ge=0, description="Indice de inicio (base 0)."),
    limite: Optional[int] = Query(None, ge=0, description="Numero maximo de elementos."),
) -> List[PartidoOut]:
    return list_partidos(inicio, limite)


@router.get("/{partido_id}", response_model=PartidoOut)
def get_partido(partido_id: int) -> PartidoOut:
    return get_partido_or_404(partido_id)


@router.post("", response_model=PartidoOut, status_code=status.HTTP_201_CREATED)
def post_partido(payload: PartidoCreate) -> PartidoOut:
    return create_partido(payload)


@router.put("/{partido_id}", response_model=PartidoOut)
def put_partido(partido_id: int, payload: PartidoUpdate) -> PartidoOut:
    return update_partido(partido_id, payload)


@router.delete("/{partido_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partido_endpoint(partido_id: int) -> None:
    delete_partido(partido_id)
    return None
