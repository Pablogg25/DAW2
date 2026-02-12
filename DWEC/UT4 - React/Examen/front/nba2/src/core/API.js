const URL = "http://127.0.0.1:8000/";

const API = (() => {
  // ============================================================
  // EQUIPOS
  // ============================================================

  async function obtenerEquipos() {
    const response = await fetch(URL + "equipos");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener equipos");
    }

    return await response.json();
  }

  async function crearEquipo(equipo) {
    const response = await fetch(URL + "equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipo),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al crear equipo");
    }

    return await response.json();
  }

  async function obtenerEquipo(id) {
    const response = await fetch(URL + `equipos/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener equipo");
    }

    return await response.json();
  }

  async function actualizarEquipo(id, equipo) {
    const response = await fetch(URL + `equipos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipo),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al actualizar equipo");
    }

    return await response.json();
  }

  async function eliminarEquipo(id) {
    const response = await fetch(URL + `equipos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al eliminar equipo");
    }

    return true;
  }

  // ============================================================
  // PARTIDOS
  // ============================================================

  async function obtenerPartidos(inicio = "", limite = "") {
    let url_final = URL + "partidos";

    if (inicio !== "" && limite === "") {
      url_final += `?inicio=${inicio}`;
    }

    if (limite !== "" && inicio === "") {
      url_final += `?limite=${limite}`;
    }

    if (inicio !== "" && limite !== "") {
      url_final += `?inicio=${inicio}&limite=${limite}`;
    }

    const response = await fetch(url_final);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener partidos");
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
      throw new Error(errorData.detail || "Error al crear partido");
    }

    return await response.json();
  }

  async function obtenerPartido(id) {
    const response = await fetch(URL + `partidos/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener partido");
    }

    return await response.json();
  }

  async function actualizarPartido(id, partido) {
    const response = await fetch(URL + `partidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partido),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al actualizar partido");
    }

    return await response.json();
  }

  async function eliminarPartido(id) {
    const response = await fetch(URL + `partidos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al eliminar partido");
    }

    return true;
  }

  // ============================================================
  // CLASIFICACIÓN
  // ============================================================

  async function obtenerClasificacion() {
    const response = await fetch(URL + "clasificacion");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Error al obtener clasificación");
    }

    return await response.json();
  }

  return {
    obtenerEquipos,
    crearEquipo,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo,
    obtenerPartidos,
    crearPartido,
    obtenerPartido,
    actualizarPartido,
    eliminarPartido,
    obtenerClasificacion,
  };
})();
