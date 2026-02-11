// 6 equipos NBA (sin campos calculados)
export const equipos = [
  { equipoId: 1, nombre: "Los Angeles Lakers", ciudad: "Los Ángeles", entrenador: "Darvin Ham" },
  { equipoId: 2, nombre: "Boston Celtics", ciudad: "Boston", entrenador: "Joe Mazzulla" },
  { equipoId: 3, nombre: "Golden State Warriors", ciudad: "San Francisco", entrenador: "Steve Kerr" },
  { equipoId: 4, nombre: "Milwaukee Bucks", ciudad: "Milwaukee", entrenador: "Doc Rivers" },
  { equipoId: 5, nombre: "Denver Nuggets", ciudad: "Denver", entrenador: "Michael Malone" },
  { equipoId: 6, nombre: "Miami Heat", ciudad: "Miami", entrenador: "Erik Spoelstra" }
];

// Media temporada (una vuelta completa: 15 partidos)
export const partidos = [
  { partidoId: 1,  fecha: "2026-02-01", equipoLocalId: 1, equipoVisitanteId: 6, puntosLocal: 102, puntosVisitante: 96 },
  { partidoId: 2,  fecha: "2026-02-01", equipoLocalId: 2, equipoVisitanteId: 5, puntosLocal: 98,  puntosVisitante: 101 },
  { partidoId: 3,  fecha: "2026-02-01", equipoLocalId: 3, equipoVisitanteId: 4, puntosLocal: 110, puntosVisitante: 105 },

  { partidoId: 4,  fecha: "2026-02-08", equipoLocalId: 6, equipoVisitanteId: 4, puntosLocal: 97,  puntosVisitante: 99 },
  { partidoId: 5,  fecha: "2026-02-08", equipoLocalId: 5, equipoVisitanteId: 3, puntosLocal: 104, puntosVisitante: 108 },
  { partidoId: 6,  fecha: "2026-02-08", equipoLocalId: 1, equipoVisitanteId: 2, puntosLocal: 95,  puntosVisitante: 100 },

  { partidoId: 7,  fecha: "2026-02-15", equipoLocalId: 2, equipoVisitanteId: 6, puntosLocal: 107, puntosVisitante: 103 },
  { partidoId: 8,  fecha: "2026-02-15", equipoLocalId: 3, equipoVisitanteId: 1, puntosLocal: 112, puntosVisitante: 109 },
  { partidoId: 9,  fecha: "2026-02-15", equipoLocalId: 4, equipoVisitanteId: 5, puntosLocal: 101, puntosVisitante: 99 },

  { partidoId: 10, fecha: "2026-02-22", equipoLocalId: 6, equipoVisitanteId: 5, puntosLocal: 94,  puntosVisitante: 98 },
  { partidoId: 11, fecha: "2026-02-22", equipoLocalId: 1, equipoVisitanteId: 4, puntosLocal: 108, puntosVisitante: 104 },
  { partidoId: 12, fecha: "2026-02-22", equipoLocalId: 2, equipoVisitanteId: 3, puntosLocal: 99,  puntosVisitante: 111 },

  { partidoId: 13, fecha: "2026-03-01", equipoLocalId: 5, equipoVisitanteId: 1, puntosLocal: 103, puntosVisitante: 106 },
  { partidoId: 14, fecha: "2026-03-01", equipoLocalId: 4, equipoVisitanteId: 2, puntosLocal: 96,  puntosVisitante: 102 },
  { partidoId: 15, fecha: "2026-03-01", equipoLocalId: 6, equipoVisitanteId: 3, puntosLocal: 105, puntosVisitante: 109 }
];
