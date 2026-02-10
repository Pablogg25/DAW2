import React from "react";
import { useState } from "react";
import $API from "../core/API";
import { useEffect } from "react";
function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    async function cargarPacientes() {
      const lista = await $API.obtenerPacientes();
      setPacientes(lista);
    }
    cargarPacientes();
  }, []);

  return (
    <>
      <div>PacientesPage</div>
      {pacientes.map((p) => (
        <div key={p.id}>
          <div>{p.nombre}</div>
        </div>
      ))}
    </>
  );
}

export default PacientesPage;
