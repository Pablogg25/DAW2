import { get } from "./api.js";
import { crearPaginador, mostrarDatos } from "./utils.js";

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");
let pagina = null;

let datos = [];
let paginaActual = 1;

localStorage.setItem("Paginas", pageSize.value);
let itemsPorPagina = localStorage.getItem("Paginas");

(async () => {
  try {
    const params = new URLSearchParams(location.search);
    const postId = params.get("postId");

    if (postId) {
      datos = await get("comments", `?postId=${postId}`);
    } else {
      datos = await get("comments");
    }

    actualizar();
  } catch (e) {
    error.textContent = "Error " + e.message;
  }
})();

pageSize.addEventListener("change", () => {
  itemsPorPagina = pageSize.value;
  localStorage.setItem("Paginas", itemsPorPagina);
  paginaActual = 1;
  actualizar();
});

filtro.addEventListener("input", () => {
  paginaActual = 1;
  actualizar();
});

function actualizar() {
  let filtrados = datos.filter((c) =>
    c.name.toLowerCase().includes(filtro.value.toLowerCase())
  );

  if (itemsPorPagina !== "all") {
    const inicio = (paginaActual - 1) * Number(itemsPorPagina);
    const fin = inicio + Number(itemsPorPagina);
    pagina = filtrados.slice(inicio, fin);
  } else {
    pagina = filtrados.slice(1, filtrados.length);
  }

  mostrarDatos(pagina, contenedor, pintarItem);

  crearPaginador(paginador, filtrados, itemsPorPagina, paginaActual);
}

function pintarItem(c) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p><strong>${c.name}</strong></p>
    <p>${c.email}</p>
    <p>${c.body}</p>
  `;
  contenedor.appendChild(div);
}
