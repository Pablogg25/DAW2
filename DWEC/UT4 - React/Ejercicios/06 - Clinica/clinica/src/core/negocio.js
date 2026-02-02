import datos from "./datos.js";

const $negocio = (function () {
  if (!localStorage.getItem("pacientes")) {
    localStorage.setItem("pacientes", JSON.stringify(datos.pacientes));
    localStorage.setItem("expedientes", JSON.stringify(datos.expedientes));
    localStorage.setItem("usuarios", JSON.stringify(datos.usuarios));
  }
  let pacientes = JSON.parse(localStorage.getItem("pacientes"));
  let expedientes = JSON.parse(localStorage.getItem("expedientes"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const URL = "http://127.0.0.1:8000/api";

  // function siguientePacienteId() {
  //   let maxId = Math.max(...pacientes.map(p => p.id), 0);
  //   return maxId + 1;
  // }

  // /*   function siguienteExpedienteId() {
  //     let maxId = Math.max(...expedientes.map(e => e.id), 0);
  //     return maxId + 1;
  //   } */

  // function siguienteUsuarioId() {
  //   let maxId = Math.max(...usuarios.map(u => u.id), 0);
  //   return maxId + 1;
  // }

  async function obtenerPacientes() {
    try {
      const response = await fetch(URL + `/pacientes`);
      if (!response) {
        throw new Error("Error al obtener pacientes " + response.status);
      }
      return response.json();
    } catch (e) {
      console.error("Error al recuperar los pacientes ", e.message);
    }
  }

  async function obtenerPaciente(pacienteId) {
    try {
      const response = await fetch(URL + `/pacientes/${pacienteId}`);
      if (!response) {
        throw new Error("Error al recibir el paciente " + response.status);
      }
      return response.json();
    } catch (e) {
      console.error("Error al recibir el paciente " + e.message);
    }
  }

  async function crearPaciente(objPaciente) {
    const response = await fetch(URL + `/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objPaciente),
    });
    if (!response.ok) {
      throw new Error(`Error al crear el paciente ${response.status}`);
    }
    return await response.json();
  }

  async function actualizarPaciente(objPaciente) {
    let index = pacientes.findIndex((p) => p.id == objPaciente.id);
    if (index !== -1) {
      pacientes[index] = objPaciente;
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      return true;
    }
    return false;
  }

  async function eliminarPaciente(pacienteId) {
    await fetch(URL + `/pacientes/${pacienteId}`, {
      method: "DELETE",
    });
  }

  async function obtenerExpediente(pacienteId) {
    try {
      const response = await fetch(URL + `/expedientes/paciente/${pacienteId}`);
      if (!response) {
        throw new Error("Error al obtener el paciente", response.status);
      }
      return await response.json();
    } catch (e) {
      console.error("Error al obtener el pacieciente", e.message);
    }
  }

  async function actualizarExpediente(expediente, id) {
    const response = await fetch(URL + `/expedientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expediente),
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    // return await response.json();
  }

  async function obtenerUsuarios() {
    //no hay parámetros...
    return [...usuarios];
  }

  async function obtenerUsuario(usuarioId) {
    let index = usuarios.findIndex((u) => u.id == usuarioId);
    if (index !== -1) {
      return usuarios[index];
    }
    return null;
  }

  async function crearUsuario(objUsuario) {
    // objUsuario.id = siguienteUsuarioId();
    usuarios.push(objUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    return objUsuario.id;
  }

  async function actualizarUsuario(objUsuario) {
    let index = usuarios.findIndex((u) => u.id == objUsuario.id);
    if (index !== -1) {
      usuarios[index] = objUsuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return true;
    }
    return false;
  }

  async function eliminarUsuario(usuarioId) {
    let index = usuarios.findIndex((u) => u.id == usuarioId);
    if (index !== -1) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return true;
    }
    return false;
  }

  async function validarUsuario(username, password) {
    let index = usuarios.findIndex(
      (u) => u.username == username && u.password == password,
    );
    if (index !== -1) {
      return usuarios[index];
    }
    return false;
  }

  function limpiarLocalStorage() {
    localStorage.removeItem("pacientes");
    localStorage.removeItem("expedientes");
    localStorage.removeItem("usuarios");
  }

  return {
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,

    obtenerExpediente,
    actualizarExpediente,

    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,

    validarUsuario,
    limpiarLocalStorage,
  };
})();

window.$negocio = $negocio;
export default $negocio;

/* FUNCION DE PRUEBA, NO TE HACE FALTA */
export async function pruebas() {
  // Test obtenerPacientes
  const pacientes = await $negocio.obtenerPacientes();
  console.log("obtenerPacientes: ", pacientes);

  // Test obtenerPaciente
  const paciente1 = await $negocio.obtenerPaciente(1);
  console.log("obtenerPaciente: ", paciente1);

  // Test crearPaciente
  const nuevoPaciente = { nombre: "Juan", apellido: "Perez" };
  const nuevoPacienteId = await $negocio.crearPaciente(nuevoPaciente);
  const pacienteCreado = await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log(
    "crearPaciente: ",
    pacienteCreado !== null &&
      pacienteCreado.nombre === "Juan" &&
      pacienteCreado.apellido === "Perez",
  );

  // Test actualizarPaciente
  const pacienteActualizado = {
    id: nuevoPacienteId,
    nombre: "Juan",
    apellido: "Perez",
  };
  const resultActualizarPaciente =
    await $negocio.actualizarPaciente(pacienteActualizado);
  const pacienteActualizadoObtenido =
    await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log(
    "actualizarPaciente: ",
    resultActualizarPaciente === true &&
      pacienteActualizadoObtenido.nombre === "Juan" &&
      pacienteActualizadoObtenido.apellido === "Perez",
  );

  // Test eliminarPaciente
  const resultEliminarPaciente =
    await $negocio.eliminarPaciente(nuevoPacienteId);
  const pacienteEliminado = await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log(
    "eliminarPaciente: ",
    resultEliminarPaciente === true && pacienteEliminado === null,
  );

  // Test obtenerExpediente
  const expediente1 = await $negocio.obtenerExpediente(1);
  console.log("obtenerExpediente: ", expediente1);

  // Test actualizarExpediente
  const expedienteActualizado = {
    id: 1,
    pacienteId: 1,
    fechaApertura: "2023-01-01",
  };
  const resultActualizarExpediente = await $negocio.actualizarExpediente(
    expedienteActualizado,
  );
  const expedienteActualizadoObtenido = await $negocio.obtenerExpediente(1);
  console.log(
    "actualizarExpediente: ",
    resultActualizarExpediente === true &&
      expedienteActualizadoObtenido.fechaApertura === "2023-01-01",
  );

  // Test obtenerUsuarios
  const usuarios = await $negocio.obtenerUsuarios();
  console.log("obtenerUsuarios: ", Array.isArray(usuarios));

  // Test obtenerUsuario
  const usuario1 = await $negocio.obtenerUsuario(1);
  console.log("obtenerUsuario: ", usuario1);

  // Test crearUsuario
  const nuevoUsuario = { username: "jdoe", password: "1234" };
  const nuevoUsuarioId = await $negocio.crearUsuario(nuevoUsuario);
  const usuarioCreado = await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log(
    "crearUsuario: ",
    usuarioCreado !== null && usuarioCreado.username === "jdoe",
  );

  // Test actualizarUsuario
  const usuarioActualizado = {
    id: nuevoUsuarioId,
    username: "jdoe",
    password: "1234",
  };
  const resultActualizarUsuario =
    await $negocio.actualizarUsuario(usuarioActualizado);
  const usuarioActualizadoObtenido =
    await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log(
    "actualizarUsuario: ",
    resultActualizarUsuario === true &&
      usuarioActualizadoObtenido.username === "jdoe",
  );

  // Test eliminarUsuario
  const resultEliminarUsuario = await $negocio.eliminarUsuario(nuevoUsuarioId);
  const usuarioEliminado = await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log(
    "eliminarUsuario: ",
    resultEliminarUsuario === true && usuarioEliminado === null,
  );

  // Test validarUsuario
  const usuarioValidado = await $negocio.validarUsuario("ana", "medico123");
  console.log("validarUsuario (datos correctos): ", usuarioValidado);

  const usuarioValidadoFallo = await $negocio.validarUsuario("jdoe", "1234");
  console.log(
    "validarUsuario (datos incorrectos): ",
    usuarioValidadoFallo === false,
  );

  // Test limpiarLocalStorage
  $negocio.limpiarLocalStorage();
  console.log(
    "limpiarLocalStorage: ",
    localStorage.getItem("pacientes") === null &&
      localStorage.getItem("expedientes") === null &&
      localStorage.getItem("usuarios") === null,
  );
}
