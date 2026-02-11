import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import $API from "../core/API";

function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarPacientes() {
      const lista = await $API.obtenerPacientes();
      setPacientes(lista);
    }
    cargarPacientes();
  }, []);

  async function eliminarPaciente(id) {
    try {
      const response = await $API.eliminarPaciente(id);
      const lista = await $API.obtenerPacientes();
      setPacientes(lista);
      return response;
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) {
    return <ErrorMessage mensaje={error} />;
  }

  return (
    <>
      <h2>Pacientes</h2>

      <div className="cabecera">
        <div className="col">Nombre</div>
        <div className="col">DNI</div>
        <div className="col">Teléfono</div>
        <div className="col">Dirección</div>
        <div className="col">Acciones</div>
      </div>

      {pacientes.map((p) => (
        <div className="fila" key={p.id}>
          <div className="col">{p.nombre}</div>
          <div className="col">{p.dni}</div>
          <div className="col">{p.telefono}</div>
          <div className="col">{p.direccion}</div>

          <div className="col acciones">
            <button onClick={() => navigate(`/paciente/${p.id}`)}>Ver</button>
            <button onClick={() => eliminarPaciente(p.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default PacientesPage;
