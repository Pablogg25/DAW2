"""In-memory data and helpers.

The data is reset on each application restart to keep the exercise simple.
"""

from __future__ import annotations

from datetime import date
from typing import Dict, List, Optional


# Initial data adapted from datos.js (kept in memory).
equipos: List[Dict] = [
    {"equipoId": 1, "nombre": "Los Angeles Lakers", "ciudad": "Los Angeles", "entrenador": "Darvin Ham"},
    {"equipoId": 2, "nombre": "Boston Celtics", "ciudad": "Boston", "entrenador": "Joe Mazzulla"},
    {"equipoId": 3, "nombre": "Golden State Warriors", "ciudad": "San Francisco", "entrenador": "Steve Kerr"},
    {"equipoId": 4, "nombre": "Milwaukee Bucks", "ciudad": "Milwaukee", "entrenador": "Doc Rivers"},
    {"equipoId": 5, "nombre": "Denver Nuggets", "ciudad": "Denver", "entrenador": "Michael Malone"},
    {"equipoId": 6, "nombre": "Miami Heat", "ciudad": "Miami", "entrenador": "Erik Spoelstra"},
]

partidos: List[Dict] = [
    {"partidoId": 1, "fecha": date(2026, 2, 1), "equipoLocalId": 1, "equipoVisitanteId": 6, "puntosLocal": 102, "puntosVisitante": 96},
    {"partidoId": 2, "fecha": date(2026, 2, 1), "equipoLocalId": 2, "equipoVisitanteId": 5, "puntosLocal": 98, "puntosVisitante": 101},
    {"partidoId": 3, "fecha": date(2026, 2, 1), "equipoLocalId": 3, "equipoVisitanteId": 4, "puntosLocal": 110, "puntosVisitante": 105},

    {"partidoId": 4, "fecha": date(2026, 2, 8), "equipoLocalId": 6, "equipoVisitanteId": 4, "puntosLocal": 97, "puntosVisitante": 99},
    {"partidoId": 5, "fecha": date(2026, 2, 8), "equipoLocalId": 5, "equipoVisitanteId": 3, "puntosLocal": 104, "puntosVisitante": 108},
    {"partidoId": 6, "fecha": date(2026, 2, 8), "equipoLocalId": 1, "equipoVisitanteId": 2, "puntosLocal": 95, "puntosVisitante": 100},

    {"partidoId": 7, "fecha": date(2026, 2, 15), "equipoLocalId": 2, "equipoVisitanteId": 6, "puntosLocal": 107, "puntosVisitante": 103},
    {"partidoId": 8, "fecha": date(2026, 2, 15), "equipoLocalId": 3, "equipoVisitanteId": 1, "puntosLocal": 112, "puntosVisitante": 109},
    {"partidoId": 9, "fecha": date(2026, 2, 15), "equipoLocalId": 4, "equipoVisitanteId": 5, "puntosLocal": 101, "puntosVisitante": 99},

    {"partidoId": 10, "fecha": date(2026, 2, 22), "equipoLocalId": 6, "equipoVisitanteId": 5, "puntosLocal": 94, "puntosVisitante": 98},
    {"partidoId": 11, "fecha": date(2026, 2, 22), "equipoLocalId": 1, "equipoVisitanteId": 4, "puntosLocal": 108, "puntosVisitante": 104},
    {"partidoId": 12, "fecha": date(2026, 2, 22), "equipoLocalId": 2, "equipoVisitanteId": 3, "puntosLocal": 99, "puntosVisitante": 111},

    {"partidoId": 13, "fecha": date(2026, 3, 1), "equipoLocalId": 5, "equipoVisitanteId": 1, "puntosLocal": 103, "puntosVisitante": 106},
    {"partidoId": 14, "fecha": date(2026, 3, 1), "equipoLocalId": 4, "equipoVisitanteId": 2, "puntosLocal": 96, "puntosVisitante": 102},
    {"partidoId": 15, "fecha": date(2026, 3, 1), "equipoLocalId": 6, "equipoVisitanteId": 3, "puntosLocal": 105, "puntosVisitante": 109},
]


def get_next_equipo_id() -> int:
    """Get the next available equipoId."""
    if not equipos:
        return 1
    return max(e["equipoId"] for e in equipos) + 1


def get_next_partido_id() -> int:
    """Get the next available partidoId."""
    if not partidos:
        return 1
    return max(p["partidoId"] for p in partidos) + 1


def find_equipo(equipo_id: int) -> Optional[Dict]:
    """Return equipo dict or None if it doesn't exist."""
    return next((e for e in equipos if e["equipoId"] == equipo_id), None)


def find_partido(partido_id: int) -> Optional[Dict]:
    """Return partido dict or None if it doesn't exist."""
    return next((p for p in partidos if p["partidoId"] == partido_id), None)
