const URL = "http://127.0.0.1:8000/";

const API = (() => {
  async function getClientes(q = "") {
    const res = await fetch(URL + "clientes?q=" + q);
    return await res.json();
  }

  async function getCliente(id) {
    const res = await fetch(URL + "clientes/" + id);
    return await res.json();
  }

  async function crearCliente(cliente) {
    const res = await fetch(URL + "clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!res.ok) throw new Error("Error al crear");

    return await res.json();
  }

  async function actualizarCliente(id, cliente) {
    const res = await fetch(URL + "clientes/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!res.ok) throw new Error("Error al actualizar");

    return await res.json();
  }

  async function borrarCliente(id) {
    const res = await fetch(URL + "clientes/" + id, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al borrar");
  }

  return {
    getClientes,
    getCliente,
    crearCliente,
    actualizarCliente,
    borrarCliente,
  };
})();

export default API;
