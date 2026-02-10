const URL = "http://127.0.0.1:8000/api/";

const $API = (() => {
  async function obtenerPacientes(filtro, inicio, limite) {
    if (!filtro || !inicio || !limite) {
      const response = await fetch(URL + `pacientes`);
      if (!response.ok) {
        throw new Error(`Error al obtener los pacientes ` + response.status);
      }
      return await response.json();
    } else {
      const response = await fetch(
        URL + `pacientes?filtro=${filtro}&inicio=${inicio}&limite=${limite}`,
      );
      if (!response.ok) {
        throw new Error(`Error al obtener los pacientes ` + response.status);
      }
      return await response.json();
    }
  }

  async function obtenerPaciente(id) {
    const response = await fetch(URL + `pacientes/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener los pacientes ` + response.status);
    }
    return await response.json();
  }

  return { obtenerPacientes, obtenerPaciente };
})();
export default $API;
