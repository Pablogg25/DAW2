const url = "https://jsonplaceholder.typicode.com";

export async function get(recurso, parametros = "") {
  try {
    const response = await fetch(`${url}/${recurso}${parametros}`);

    if (!response.ok) {
      throw new Error("Error al realizar la petición: " + response.status);
    }
    // console.log(response.json());
    return await response.json();
  } catch (e) {
    console.log("Error al realizar la petición", e);
    throw e;
  }
}

export async function update(recurso, id, data) {
  try {
    const response = await fetch(`${url}/${recurso}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar: " + response.status);
    }

    return await response.json();
  } catch (e) {
    console.log("Error al actualizar", e);
    throw e;
  }
}
