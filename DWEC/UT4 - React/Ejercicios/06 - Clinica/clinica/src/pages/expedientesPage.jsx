import { useEffect, useState } from "react";
import "./ExpedientesPage.css";
import negocio from "../core/negocio.js";
import { useNavigate } from "react-router-dom";

function ExpedientesPage() {
  const [pacientes, setExpedientes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function cargar() {
      const lista = await negocio.obtenerPacientes();
      setExpedientes(lista);
    }
    cargar();
  }, [pacientes]);
  return (
    <>
      <p>Lista de Expedientes</p>
      <input type="text" placeholder="Buscador..." />
      <br />
      <br />
      <div className="tabla">
        {pacientes.map((p) => (
          <div
            key={p.id}
            className="paciente"
            onClick={() => navigate(`/expediente/${p.id}`)}
          >
            <p className="props">{p.nombre} </p>
            <p className="props">{p.seguroMedico}</p>
            <p className="props">{p.telefono}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default ExpedientesPage;
