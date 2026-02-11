import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/API";
import ErrorMessage from "../components/ErrorMessage";

function EquiposPage() {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function cargarEquipos() {
      const lista = await API.obtenerEquipos();
      setEquipos(lista);
    }
    cargarEquipos();
  }, []);

  async function eliminarEquipo(id) {
    try {
      await API.eliminarEquipo(id);
      const lista = await API.obtenerEquipos();
      setEquipos(lista);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div>EquiposPage</div>
      <ErrorMessage error={error} />

      <div className="tabla">
        {/* Cabecera */}
        <div className="fila cabecera">
          <div>Nombre</div>
          <div>Ciudad</div>
          <div>Entrenador</div>
          <div>Acciones</div>
        </div>
        {/* Equipos */}
        {equipos.map((e) => (
          <div className="fila" key={e.equipoId}>
            <div>{e.nombre}</div>
            <div>{e.ciudad}</div>
            <div>{e.entrenador}</div>
            <div>
              <button onClick={() => navigate(`/equipos/${e.equipoId || 0}`)}>
                Ver
              </button>
              <button onClick={() => eliminarEquipo(e.equipoId)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EquiposPage;
