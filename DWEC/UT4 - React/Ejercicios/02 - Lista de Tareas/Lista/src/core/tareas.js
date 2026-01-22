export async function cargaTareas() {
  // leer localStorage
  let tareas = localStorage.getItem("tareas");
  if (tareas) {
    return JSON.parse(tareas);
  } else {
    // si no hay nada, devolver []
    return [];
  }
}

export async function guardarTareas(lista) {
  // guardar en localStorage
  localStorage.setItem("tareas", JSON.stringify(lista));
}
