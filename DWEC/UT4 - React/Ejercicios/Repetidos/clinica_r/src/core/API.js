const URL = "http://127.0.0.1:8000/api/";

const $API = (() => {
  async function obtenerPacientes(filtro, inicio, limite) {
    try {
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
    } catch (err) {
      console.error(err.message);
    }
  }

  async function obtenerPaciente(id) {
    try {
      const response = await fetch(URL + `pacientes/${id}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: paciente no encontrado`);
      }

      return await response.json();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async function eliminarPaciente(id) {
    try {
      const response = await fetch(URL + `pacientes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el paciente ` + response.status);
      }
      return response;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  return { obtenerPacientes, obtenerPaciente, eliminarPaciente };
})();
export default $API;
