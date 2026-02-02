import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import negocio from "../core/negocio";

// Gestion y Administrador
function PropsPacientePage() {
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
    // Si id = 0 → es creación → no cargamos nada
    if (id === "0") return;

    async function cargarPaciente() {
      const datos = await negocio.obtenerPaciente(id);
      setPaciente(datos);
    }

    cargarPaciente();
  }, [id]);

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

      <label>Nombre: </label>
      <input
        type="text"
        name="nombre"
        value={paciente.nombre}
        onChange={handleChange}
      />

      <label>DNI: </label>
      <input
        type="text"
        name="dni"
        value={paciente.dni}
        onChange={handleChange}
      />

      <label>Email: </label>
      <input
        type="text"
        name="email"
        value={paciente.email}
        onChange={handleChange}
      />

      <label>Telefono: </label>
      <input
        type="text"
        name="telefono"
        value={paciente.telefono}
        onChange={handleChange}
      />

      <label>Fecha de Nacimiento: </label>
      <input
        type="text"
        name="fechaNacimiento"
        value={paciente.fechaNacimiento}
        onChange={handleChange}
      />

      <label>Sexo: </label>
      <input
        type="text"
        name="sexo"
        value={paciente.sexo}
        onChange={handleChange}
      />

      <label>Direccion: </label>
      <input
        type="text"
        name="direccion"
        value={paciente.direccion}
        onChange={handleChange}
      />

      <label>Seguro Médico: </label>
      <input
        type="text"
        name="seguroMedico"
        value={paciente.seguroMedico}
        onChange={handleChange}
      />

      {esNuevo ? (
        <button onClick={crearPaciente}>Crear Paciente</button>
      ) : (
        <button onClick={guardarCambios}>Guardar Cambios</button>
      )}
    </>
  );
}

export default PropsPacientePage;
