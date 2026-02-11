import React, { useEffect, useState } from "react";
import API from "../core/API";
import ErrorMessage from "../components/ErrorMessage";
import { useParams } from "react-router-dom";

function PacientePage() {
  const { id } = useParams(); // CORREGIDO: ahora sí recibes el id
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await API.obtenerPaciente(id);
        setPaciente(datos);
      } catch (err) {
        setError(err.message);
      }
    }
    cargar();
  }, [id]);

  if (error) {
    return <ErrorMessage mensaje={error} />;
  }

  if (!paciente) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>{paciente.nombre}</h2>
      <p>{paciente.edad} años</p>
    </div>
  );
}

export default PacientePage;
