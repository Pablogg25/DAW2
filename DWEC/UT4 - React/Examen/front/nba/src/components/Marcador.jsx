import React from "react";

function Marcador({ partido }) {
  const ganador =
    partido.puntosLocal > partido.puntosVisitante
      ? partido.equipoLocalId
      : partido.equipoVisitanteId;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "6px",
        width: "fit-content",
        marginBottom: "10px",
      }}
    >
      <h3>Marcador</h3>
      <div>
        <strong>Local:</strong> {partido.puntosLocal}
      </div>
      <div>
        <strong>Visitante:</strong> {partido.puntosVisitante}
      </div>
      <div>
        <strong>Ganador:</strong> {ganador}
      </div>
    </div>
  );
}

export default Marcador;
