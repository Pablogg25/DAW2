"""Clasificacion endpoint."""

from __future__ import annotations

from typing import List

from fastapi import APIRouter

from ..schemas import ClasificacionOut
from ..services import get_clasificacion


router = APIRouter(prefix="/clasificacion", tags=["clasificacion"])


@router.get("", response_model=List[ClasificacionOut])
def get_clasificacion_endpoint() -> List[ClasificacionOut]:
    return get_clasificacion()
