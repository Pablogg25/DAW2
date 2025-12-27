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
    const userId = params.get("userId");

    if (userId) {
      datos = await get("albums", `?userId=${userId}`);
    } else {
      datos = await get("albums");
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
  let filtrados = datos.filter((a) =>
    a.title.toLowerCase().includes(filtro.value.toLowerCase())
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

function pintarItem(a) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${a.id} - ${a.title}</p>
    <button onclick="location.href='./photos.html?albumId=${a.id}'">Ver fotos</button>
  `;
  contenedor.appendChild(div);
}
