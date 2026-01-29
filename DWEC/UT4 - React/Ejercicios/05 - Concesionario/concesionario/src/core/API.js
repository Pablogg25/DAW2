// API
const API = "http://127.0.0.1:8000/coches";
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
  return { obtenerCoches, eliminarCoche };
})();
window.$API = $API;
export default $API;
