const API = "https://jsonplaceholder.typicode.com/";

export async function cargarPosts(recurso, parametros = "") {
  try {
    const response = await fetch(API + "posts");

    if (!response.ok) {
      throw new Error("Error al realizar la petición: " + response.status);
    }
    // console.log(response.json);
    return await response.json();
  } catch (e) {
    console.log("Error al realizar la petición", e);
    throw e;
  }
}
