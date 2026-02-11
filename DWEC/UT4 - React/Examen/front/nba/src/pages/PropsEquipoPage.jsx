import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../core/API";

function PropsEquipoPage() {
  const [equipo, setEquipo] = useState({
    nombre: "",
    ciudad: "",
    entrenador: "",
    equipoId: 0,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar equipo si estamos editando
  useEffect(() => {
    async function cargarEquipo() {
      if (id !== "0") {
        try {
          const item = await API.obtenerEquipo(id);
          setEquipo(item);
        } catch (err) {
          setError("No se pudo cargar el equipo");
        }
      }
    }
    cargarEquipo();
  }, [id]);

  // Manejar cambios en inputs
  function handleChange(e) {
    setEquipo({
      ...equipo,
      [e.target.name]: e.target.value,
    });
  }

  // Guardar (crear o actualizar)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id === "0") {
        await API.crearEquipo(equipo);
      } else {
        await API.actualizarEquipo(equipo, id);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <h2>{id === "0" ? "Crear equipo" : "Editar equipo"}</h2>

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

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={equipo.nombre}
          onChange={handleChange}
          required
        />

        <label>Ciudad</label>
        <input
          type="text"
          name="ciudad"
          value={equipo.ciudad}
          onChange={handleChange}
          required
        />

        <label>Entrenador</label>
        <input
          type="text"
          name="entrenador"
          value={equipo.entrenador}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {id === "0" ? "Crear" : "Guardar cambios"}
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </>
  );
}

export default PropsEquipoPage;
