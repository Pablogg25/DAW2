import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import negocio from "../core/negocio.js";
import "./PropsExpedientePage.css";
import { useNavigate } from "react-router-dom";
function PropsExpedientePage() {
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

  function handleChange(e) {
    const { name, value } = e.target;
    setExpediente((prev) => ({ ...prev, [name]: value }));
  }

  async function editarExpediente(expediente, id) {
    await negocio.actualizarExpediente(expediente, id);
    navigate("/expedientes");
  }

  return (
    <>
      <p>Props Expediente</p>
      <div className="contenedor">
        <p className="propsE">{paciente.nombre}</p>
        <p className="propsE">{paciente.email}</p>
        <p className="propsE">{paciente.telefono}</p>
        <p className="propsE">{paciente.fechaNacimiento}</p>
      </div>
      <br />
      <div className="expediente">
        <input
          type="text"
          name="id"
          value={expediente.id}
          onChange={handleChange}
          hidden
        />
        <label htmlFor="fechaApertura">Fecha de Apertura: </label>
        <input
          type="date"
          name="fechaApertura"
          value={expediente.fechaApertura}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="antecedentes">Antecedentes: </label>
        <input
          type="text"
          name="antecedentes"
          value={expediente.antecedentes}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="diagnosticos">Diagnosticos: </label>
        <input
          type="text"
          name="diagnosticos"
          value={expediente.diagnosticos}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="tratamientos">Tratamientos: </label>
        <input
          type="text"
          name="tratamientos"
          value={expediente.tratamientos}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="observaciones">Observaciones: </label>
        <input
          type="text"
          name="observaciones"
          value={expediente.observaciones}
          onChange={handleChange}
        />

        <button onClick={() => editarExpediente(expediente, id)}>
          Actualizar
        </button>
      </div>
    </>
  );
}
export default PropsExpedientePage;
