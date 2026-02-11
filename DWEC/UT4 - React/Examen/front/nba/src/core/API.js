const URL = "http://127.0.0.1:8000/";

// Equipos
const API = (() => {
  async function obtenerEquipos() {
    const response = await fetch(URL + "equipos");
    if (!response.ok)
      throw new Error("Error al obtener los equipos " + response.status);
    return await response.json();
  }

  async function crearEquipo(equipo) {
    const response = await fetch(URL + "equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipo),
    });
    if (!response.ok)
      throw new Error("Error al crear el equipo " + response.status);
    return await response.json();
  }

  async function obtenerEquipo(id) {
    const response = await fetch(URL + `equipos/${id}`);
    if (!response.ok)
      throw new Error("Error al obtener el equipo " + response.status);
    return await response.json();
  }

  async function actualizarEquipo(equipo, id) {
    const response = await fetch(URL + `equipos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipo),
    });
    if (!response.ok)
      throw new Error("Error al actualizar el equipo " + response.status);
    return await response.json();
  }

  async function eliminarEquipo(id) {
    const response = await fetch(URL + `equipos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json(); // ← AQUÍ
      throw new Error(errorData.detail || "Error al eliminar el equipo");
    }

    return true;
  }

  // Partidos
  async function obtenerPartidos(inicio = "", limite = "") {
    let urlFinal = URL + "partidos";

    if (inicio !== "" && limite === "") urlFinal += `?inicio=${inicio}`;
    if (limite !== "" && inicio === "") urlFinal += `?limite=${limite}`;
    if (inicio !== "" && limite !== "")
      urlFinal += `?inicio=${inicio}&limite=${limite}`;

    const response = await fetch(urlFinal);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener los partidos");
    }

    return await response.json();
  }

  async function obtenerPartido(id) {
    const response = await fetch(URL + `partidos/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener el partido");
    }

    return await response.json();
  }

  async function crearPartido(partido) {
    const response = await fetch(URL + "partidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partido),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al crear el partido");
    }

    return await response.json();
  }

  async function actualizarPartido(partido, id) {
    const response = await fetch(URL + `partidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partido),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al actualizar el partido");
    }

    return await response.json();
  }

  async function eliminarPartido(id) {
    const response = await fetch(URL + `partidos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al eliminar el partido");
    }

    return true;
  }

  // Clasificación
  async function obtenerClasificacion() {
    const response = await fetch(URL + "clasificacion");
    if (!response.ok)
      throw new Error("Error al obtener la clasificación " + response.status);
    return await response.json();
  }

  return {
    obtenerEquipos,
    crearEquipo,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo,
    obtenerPartidos,
    obtenerPartido,
    crearPartido,
    actualizarPartido,
    eliminarPartido,
    obtenerClasificacion,
  };
})();

export default API;
