import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio";

function PropsPacientePage() {
  const { datos } = useContext(SeguridadContext);

  // HOOKS ARRIBA
  const { id } = useParams();
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
    if (id === "0") return;

    async function cargarPaciente() {
      const datos = await negocio.obtenerPaciente(id);
      setPaciente(datos);
    }

    cargarPaciente();
  }, [id]);

  // SEGURIDAD
  if (!datos.tienePermisos || !["gestion", "admin"].includes(datos.tipo)) {
    return <Navigate to="/login" />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
  }

  async function crearPaciente() {
    await negocio.crearPaciente(paciente);
    alert("Paciente creado correctamente");
  }

  async function guardarCambios() {
    await negocio.actualizarPaciente(paciente);
    alert("Paciente actualizado correctamente");
  }

  const esNuevo = id === "0";

  return (
    <>
      <h2>
        {esNuevo
          ? "Crear nuevo paciente"
          : `Propiedades del Paciente: ${paciente.nombre}`}
      </h2>

      <div className="card">{/* inputs */}</div>
    </>
  );
}

export default PropsPacientePage;
