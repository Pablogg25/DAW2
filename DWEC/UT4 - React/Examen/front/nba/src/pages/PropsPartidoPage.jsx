import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../core/API";
import ErrorMessage from "../components/ErrorMessage";

function PropsPartidoPage() {
  const [partido, setPartido] = useState({
    fecha: "",
    equipoLocalId: "",
    equipoVisitanteId: "",
    puntosLocal: 0,
    puntosVisitante: 0,
  });

  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar equipos + cargar partido si estamos editando
  useEffect(() => {
    async function cargarDatos() {
      try {
        const listaEquipos = await API.obtenerEquipos();
        setEquipos(listaEquipos);

        if (id !== "0") {
          const item = await API.obtenerPartido(id);
          setPartido(item);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    cargarDatos();
  }, [id]);

  // Manejar cambios en inputs
  function handleChange(e) {
    setPartido({
      ...partido,
      [e.target.name]: e.target.value,
    });
  }

  // Guardar (crear o actualizar)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id === "0") {
        await API.crearPartido(partido);
      } else {
        await API.actualizarPartido(partido, id);
      }
      navigate("/partidos");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <ErrorMessage error={error} />

      <h2>{id === "0" ? "Crear partido" : "Editar partido"}</h2>

      <form onSubmit={handleSubmit}>
        {/* FECHA */}
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={partido.fecha}
          onChange={handleChange}
          required
        />

        {/* EQUIPO LOCAL */}
        <label>Equipo Local</label>
        <select
          name="equipoLocalId"
          value={partido.equipoLocalId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione equipo</option>
          {equipos.map((e) => (
            <option key={e.equipoId} value={e.equipoId}>
              {e.nombre}
            </option>
          ))}
        </select>

        {/* EQUIPO VISITANTE */}
        <label>Equipo Visitante</label>
        <select
          name="equipoVisitanteId"
          value={partido.equipoVisitanteId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione equipo</option>
          {equipos.map((e) => (
            <option key={e.equipoId} value={e.equipoId}>
              {e.nombre}
            </option>
          ))}
        </select>

        {/* PUNTOS LOCAL */}
        <label>Puntos Local</label>
        <input
          type="number"
          name="puntosLocal"
          value={partido.puntosLocal}
          onChange={handleChange}
          min="0"
          required
        />

        {/* PUNTOS VISITANTE */}
        <label>Puntos Visitante</label>
        <input
          type="number"
          name="puntosVisitante"
          value={partido.puntosVisitante}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">
          {id === "0" ? "Crear" : "Guardar cambios"}
        </button>

        <button type="button" onClick={() => navigate("/partidos")}>
          Cancelar
        </button>
      </form>
    </>
  );
}

export default PropsPartidoPage;
