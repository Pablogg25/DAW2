import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/API";
import Marcador from "../components/Marcador";

function PartidosPage() {
  const [partidos, setPartidos] = useState([]);
  const [error, setError] = useState("");
  const [inicio, setInicio] = useState(0);
  const limite = 5; // puedes cambiarlo

  const navigate = useNavigate();

  // Cargar partidos con paginación
  useEffect(() => {
    async function cargar() {
      try {
        const lista = await API.obtenerPartidos(inicio, limite);
        setPartidos(lista);
      } catch (err) {
        setError(err.message);
      }
    }
    cargar();
  }, [inicio]);

  // Eliminar partido
  async function eliminarPartido(id) {
    try {
      await API.eliminarPartido(id);
      const lista = await API.obtenerPartidos(inicio, limite);
      setPartidos(lista);
    } catch (err) {
      setError(err.message);
    }
  }

  // Paginación
  function siguiente() {
    setInicio(inicio + limite);
  }

  function anterior() {
    if (inicio >= limite) setInicio(inicio - limite);
  }

  return (
    <>
      <h2>Partidos</h2>

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
          <div>Fecha</div>
          <div>Local</div>
          <div>Visitante</div>
          <div>Resultado</div>
          <div>Acciones</div>
        </div>

        {partidos.map((p) => (
          <div key={p.partidoId}>
            <Marcador partido={p} />

            <div className="fila">
              <div>{p.fecha}</div>
              <div>{p.equipoLocalId}</div>
              <div>{p.equipoVisitanteId}</div>
              <div>
                {p.puntosLocal} - {p.puntosVisitante}
              </div>
              <div>
                <button onClick={() => navigate(`/partidos/${p.partidoId}`)}>
                  Ver
                </button>
                <button onClick={() => eliminarPartido(p.partidoId)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={anterior} disabled={inicio === 0}>
          Anterior
        </button>
        <button onClick={siguiente}>Siguiente</button>
      </div>
    </>
  );
}

export default PartidosPage;
