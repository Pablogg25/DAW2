import React, { useEffect, useState } from "react";
import API from "../core/API";

function ClasificacionPage() {
  const [clasificacion, setClasificacion] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await API.obtenerClasificacion();
        setClasificacion(datos);
      } catch (err) {
        setError(err.message);
      }
    }
    cargar();
  }, []);

  return (
    <>
      <h2>Clasificación</h2>

      {error && (
        <div
          style={{
            background: "#ffebee",
            border: "1px solid #d32f2f",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px",
            color: "#b71c1c",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      <div className="tabla">
        <div className="fila cabecera">
          <div>Equipo</div>
          <div>Victorias</div>
          <div>Derrotas</div>
          <div>+/-</div>
        </div>

        {clasificacion.map((c) => (
          <div className="fila" key={c.equipoId}>
            <div>{c.nombre}</div>
            <div>{c.victorias}</div>
            <div>{c.derrotas}</div>
            <div>{c.diferencia}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ClasificacionPage;
