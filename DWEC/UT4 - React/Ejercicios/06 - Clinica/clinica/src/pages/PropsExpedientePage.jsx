import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio.js";
import "./PropsExpedientePage.css";

function PropsExpedientePage() {
  const { datos } = useContext(SeguridadContext);

  // HOOKS ARRIBA
  const { id } = useParams();
  const navigate = useNavigate();

  const [expediente, setExpediente] = useState({
    pacienteId: null,
    fechaApertura: "",
    antecedentes: "",
    diagnosticos: "",
    tratamientos: "",
    observaciones: "",
    id: null,
  });

  const [paciente, setPaciente] = useState({
    nombre: "",
    dni: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    sexo: "",
    direccion: "",
    seguroMedico: "",
  });

  useEffect(() => {
    async function cargarExpediente() {
      const dato = await negocio.obtenerExpediente(id);
      setExpediente(dato);
    }
    cargarExpediente();
  }, [id]);

  useEffect(() => {
    async function cargarPaciente() {
      const datos = await negocio.obtenerPaciente(id);
      setPaciente(datos);
    }
    cargarPaciente();
  }, [id]);

  // SEGURIDAD
  if (!datos.tienePermisos || !["medico", "admin"].includes(datos.tipo)) {
    return <Navigate to="/login" />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setExpediente((prev) => ({ ...prev, [name]: value }));
  }

  async function editarExpediente() {
    await negocio.actualizarExpediente(expediente);
    navigate("/expedientes");
  }

  return (
    <>
      <h2>Expediente del Paciente</h2>

      <div className="card">
        <p>
          <strong>Nombre:</strong> {paciente.nombre}
        </p>
        <p>
          <strong>Email:</strong> {paciente.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {paciente.telefono}
        </p>
        <p>
          <strong>Nacimiento:</strong> {paciente.fechaNacimiento}
        </p>
      </div>

      <div className="card">
        <label>Fecha de Apertura:</label>
        <input
          type="date"
          name="fechaApertura"
          value={expediente.fechaApertura}
          onChange={handleChange}
        />

        <label>Antecedentes:</label>
        <input
          type="text"
          name="antecedentes"
          value={expediente.antecedentes}
          onChange={handleChange}
        />

        <label>Diagnósticos:</label>
        <input
          type="text"
          name="diagnosticos"
          value={expediente.diagnosticos}
          onChange={handleChange}
        />

        <label>Tratamientos:</label>
        <input
          type="text"
          name="tratamientos"
          value={expediente.tratamientos}
          onChange={handleChange}
        />

        <label>Observaciones:</label>
        <input
          type="text"
          name="observaciones"
          value={expediente.observaciones}
          onChange={handleChange}
        />

        <button onClick={editarExpediente}>Actualizar</button>
      </div>
    </>
  );
}

export default PropsExpedientePage;
