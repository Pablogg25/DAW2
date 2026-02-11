"""Pydantic schemas and validation rules."""

from __future__ import annotations

from datetime import date
from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class EquipoBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    ciudad: str = Field(..., min_length=1, max_length=100)
    entrenador: str = Field(..., min_length=1, max_length=100)

    @field_validator("nombre", "ciudad", "entrenador")
    @classmethod
    def no_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("El campo no puede estar vacio.")
        return value


class EquipoCreate(EquipoBase):
    pass


class EquipoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    ciudad: Optional[str] = Field(None, min_length=1, max_length=100)
    entrenador: Optional[str] = Field(None, min_length=1, max_length=100)

    @field_validator("nombre", "ciudad", "entrenador")
    @classmethod
    def no_empty_optional(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and not value.strip():
            raise ValueError("El campo no puede estar vacio.")
        return value


class EquipoOut(EquipoBase):
    equipoId: int


class PartidoBase(BaseModel):
    fecha: date
    equipoLocalId: int = Field(..., ge=1)
    equipoVisitanteId: int = Field(..., ge=1)
    puntosLocal: int = Field(..., ge=0, le=220)
    puntosVisitante: int = Field(..., ge=0, le=220)

    @model_validator(mode="after")
    def equipos_distintos(self) -> "PartidoBase":
        if self.equipoLocalId == self.equipoVisitanteId:
            raise ValueError("El equipo local y visitante deben ser distintos.")
        return self


class PartidoCreate(PartidoBase):
    pass


class PartidoUpdate(BaseModel):
    fecha: Optional[date] = None
    equipoLocalId: Optional[int] = Field(None, ge=1)
    equipoVisitanteId: Optional[int] = Field(None, ge=1)
    puntosLocal: Optional[int] = Field(None, ge=0, le=220)
    puntosVisitante: Optional[int] = Field(None, ge=0, le=220)

    @model_validator(mode="after")
    def equipos_distintos(self) -> "PartidoUpdate":
        if self.equipoLocalId is not None and self.equipoVisitanteId is not None:
            if self.equipoLocalId == self.equipoVisitanteId:
                raise ValueError("El equipo local y visitante deben ser distintos.")
        return self


class PartidoOut(PartidoBase):
    partidoId: int


class ClasificacionOut(BaseModel):
    equipoId: int
    nombre: str
    puntos: int
    victorias: int
    derrotas: int
    partidosJugados: int
