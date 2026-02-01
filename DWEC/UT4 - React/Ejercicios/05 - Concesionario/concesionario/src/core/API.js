// API
const API = "http://127.0.0.1:8000/coches";
const USUARIOS = "http://127.0.0.1:8000/usuarios/validar";
const $API = (function () {
  async function obtenerCoches(filtros) {
    try {
      const response = await fetch(API + `?${filtros}`);
      if (!response) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      //   console.log(data);
      return data;
    } catch (error) {
      console.error("Error al perdir los coches ", error.message);
    }
  }

  async function eliminarCoche(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  }

  async function obtenerCoche(id) {
    try {
      const response = await fetch(API + `/${id}`);
      if (!response) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al pedir los coches ", error.message);
    }
  }

  async function actualizarCoche(coche, id) {
    const response = await fetch(API + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coche),
    });
    if (!response) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  }

  async function validarUsuario(datos) {
    const response = await fetch("http://127.0.0.1:8000/usuarios/validar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: datos.username,
        password: datos.password,
      }),
    });

    // Si la API devuelve 422, aquí evitamos que pete
    if (!response.ok) {
      return { status: response.status, body: false };
    }

    // Esto debe devolver EXACTAMENTE lo que devuelve tu backend
    return await response.json();
  }

  return {
    obtenerCoches,
    eliminarCoche,
    obtenerCoche,
    actualizarCoche,
    validarUsuario,
  };
})();
window.$API = $API;
export default $API;
