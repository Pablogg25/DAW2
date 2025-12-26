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
    datos = await get("todos");
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
  let filtrados = datos.filter((u) =>
    u.title.toLowerCase().includes(filtro.value.toLowerCase())
  );

  if (itemsPorPagina !== "all") {
    // alert(filtrados.length);
    const inicio = (paginaActual - 1) * Number(itemsPorPagina);
    const fin = inicio + Number(itemsPorPagina);
    pagina = filtrados.slice(inicio, fin);
  } else {
    // alert(filtrados.length);
    const inicio2 = 1;
    const fin2 = filtrados.length;
    pagina = filtrados.slice(inicio2, fin2);
  }

  mostrarDatos(pagina, contenedor, pintarItem);

  crearPaginador(paginador, filtrados, itemsPorPagina, paginaActual);
}
function pintarItem(u) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${u.id} - ${u.title}</p>
    <button onclick="location.href='./todos.html?id=${u.id}'">Ver Pendientes</button>
    <button onclick="location.href='./albums.html?id=${u.id}'">Ver albumes</button>
    <button onclick="location.href=./posts.html?id=${u.id}'">Ver posts</button>
    `;
  contenedor.appendChild(div);
}
