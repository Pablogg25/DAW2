import apiController from "./ApiController.js";

const $eventosController = (function () {
  console.log("Inicializando eventosController");

  async function getEventos(filtros = {}) {
    try {
      const params = new URLSearchParams(filtros).toString();
      const url =
        apiController.getBaseUrl() + "/eventos" + (params ? "?" + params : "");

      const request = await fetch(url);
      const respuesta = await request.json();

      console.log("DATA API EVENTOS:", respuesta);

      // Caso 1: la API devuelve directamente un array
      if (Array.isArray(respuesta)) {
        return { success: true, data: respuesta };
      }

      // Caso 2: la API devuelve { data: [...] }
      if (respuesta.data && Array.isArray(respuesta.data)) {
        return { success: true, data: respuesta.data };
      }

      // Caso 3: no hay eventos
      return { success: true, data: [] };
    } catch (e) {
      console.log("Error cargando eventos:", e);
      return { success: true, data: [] };
    }
  }

  async function createEvento(evento) {
    try {
      const request = await fetch(apiController.getBaseUrl() + "/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });

      const respuesta = await request.json();
      return respuesta;
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  async function deleteEvento(id) {
    try {
      const request = await fetch(
        apiController.getBaseUrl() + "/eventos/" + id,
        { method: "DELETE" },
      );

      const respuesta = await request.json();
      return respuesta;
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  return {
    getEventos,
    createEvento,
    deleteEvento,
  };
})();

export default $eventosController;
