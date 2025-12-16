const url = "https://jsonplaceholder.typicode.com/";

export async function get(resource, params = "") {
  try {
    const response = await fetch(`${url}/${resource}${params}`);
    if (!response.ok) {
      throw new Error("ERROR HTTP", response.status);
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
}

export async function update(resource, id, data) {
  try {
    const response = await fetch(`${url}/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error HTTP", response.status);
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
}
