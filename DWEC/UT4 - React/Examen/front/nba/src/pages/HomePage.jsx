import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/API";
import ErrorMessage from "../components/ErrorMessage";
import Marcador from "../components/Marcador";

function HomePage() {
  const [proximos, setProximos] = useState([]);
  const [ultimos, setUltimos] = useState([]);
  const [clasificacion, setClasificacion] = useState([]);
  const [destacado, setDestacado] = useState(null);
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function cargarDashboard() {
      try {
        const listaEquipos = await API.obtenerEquipos();
        setEquipos(listaEquipos);

        const prox = await API.obtenerPartidos(0, 3);
        setProximos(prox);

        const ult = await API.obtenerPartidos(3, 3);
        setUltimos(ult);

        const clasif = await API.obtenerClasificacion();
        setClasificacion(clasif.slice(0, 5));

        if (prox.length > 0) setDestacado(prox[0]);
      } catch (err) {
        setError(err.message);
      }
    }

    cargarDashboard();
  }, []);

  function nombreEquipo(id) {
    const eq = equipos.find((e) => e.equipoId === id);
    return eq ? eq.nombre : "Desconocido";
  }

  return (
    <>
      <ErrorMessage error={error} />

      <h1>Dashboard</h1>

      {/* PARTIDO DESTACADO */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Partido destacado</h2>
        {destacado ? (
          <Marcador partido={destacado} />
        ) : (
          <p>No hay partidos disponibles.</p>
        )}
      </section>

      {/* PRÓXIMOS PARTIDOS */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Próximos partidos</h2>
        <div className="tabla">
          <div className="fila cabecera">
            <div>Fecha</div>
            <div>Local</div>
            <div>Visitante</div>
            <div>Acciones</div>
          </div>

          {proximos.map((p) => (
            <div className="fila" key={p.partidoId}>
              <div>{p.fecha}</div>
              <div>{nombreEquipo(p.equipoLocalId)}</div>
              <div>{nombreEquipo(p.equipoVisitanteId)}</div>
              <div>
                <button onClick={() => navigate(`/partidos/${p.partidoId}`)}>
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÚLTIMOS RESULTADOS */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Últimos resultados</h2>
        <div className="tabla">
          <div className="fila cabecera">
            <div>Fecha</div>
            <div>Local</div>
            <div>Visitante</div>
            <div>Resultado</div>
            <div>Acciones</div>
          </div>

          {ultimos.map((p) => (
            <div className="fila" key={p.partidoId}>
              <div>{p.fecha}</div>
              <div>{nombreEquipo(p.equipoLocalId)}</div>
              <div>{nombreEquipo(p.equipoVisitanteId)}</div>
              <div>
                {p.puntosLocal} - {p.puntosVisitante}
              </div>
              <div>
                <button onClick={() => navigate(`/partidos/${p.partidoId}`)}>
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLASIFICACIÓN RESUMIDA */}
      <section>
        <h2>Clasificación (Top 5)</h2>
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
      </section>
    </>
  );
}

export default HomePage;
