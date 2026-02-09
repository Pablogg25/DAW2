const URL = "http://localhost:8000/";

const API = (() => {
  async function obtenerProductos(categoria, activo) {
    try {
      const response = await fetch(
        URL + `productos?categoria=${categoria}&activos_solo=${activo}`,
      );
      if (!response.ok) {
        throw new Error("Error al obtener los productos" + response.status);
      }
      return await response.json();
    } catch (e) {
      console.error("Error al obtener los productos" + e.message);
    }
  }

  async function validarUsuario(username, password) {
    const response = await fetch(URL + `auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error al validar usuario", response.status);
    }

    return await response.json(); // Trae token
  }

  async function crearProducto(producto) {
    console.log(JSON.stringify(producto));
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await fetch(URL + `admin/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json(); // Trae token
  }

  return { obtenerProductos, validarUsuario, crearProducto };
})();
export default API;
