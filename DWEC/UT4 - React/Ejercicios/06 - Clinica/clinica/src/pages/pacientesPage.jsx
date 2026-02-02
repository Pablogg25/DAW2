import { useEffect, useState } from "react";
import negocio from "../core/negocio";
import "./PacientesPage.css";
import { Navigate, useNavigate } from "react-router-dom";
function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function cargar() {
      const lista = await negocio.obtenerPacientes();
      setPacientes(lista);
    }
    cargar();
  }, []);

  async function eliminar(id) {
    await negocio.eliminarPaciente(id);
    const lista = await negocio.obtenerPacientes();
    setPacientes(lista);
  }
  return (
    <>
      <p>Lista de Pacientes</p>
      <input type="text" placeholder="Buscador..." />
      <button onClick={() => navigate("/paciente/0")}>Crear</button>
      <br />
      <div className="tabla">
        {pacientes.map((p) => (
          <div key={p.id} className="paciente">
            <p className="props">{p.id}</p>
            <p className="props">{p.nombre}</p>
            <p className="props">{p.dni}</p>
            <p className="props">{p.email}</p>
            <p className="props">{p.telefono}</p>
            <button onClick={() => eliminar(p.id)}>Borrar Paciente</button>
            <button onClick={() => navigate(`/paciente/${p.id}`)}>Ver</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default PacientesPage;
