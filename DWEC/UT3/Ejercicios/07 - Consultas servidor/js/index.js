// js/index.js
import { get } from "./api.js";

function cargarContador(idElemento, recurso) {
  const elemento = document.getElementById(idElemento);

  get(recurso)
    .then((datos) => {
      elemento.textContent = datos.length;
    })
    .catch((err) => {
      elemento.textContent = "Error";
      elemento.style.color = "red";
    });
}

cargarContador("users-count", "users");
cargarContador("todos-count", "todos");
cargarContador("posts-count", "posts");
cargarContador("comments-count", "comments");
cargarContador("albums-count", "albums");
cargarContador("photos-count", "photos");
