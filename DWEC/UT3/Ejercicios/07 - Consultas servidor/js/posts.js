import { get } from "./api.js";
import { crearPaginador, mostrarDatos } from "./utils.js";

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");

let datos = [];
let total = 0;
let paginaActual = 1;

let itemsPorPagina = localStorage.getItem("posts_pageSize") || pageSize.value;
pageSize.value = itemsPorPagina;

(async () => {
  try {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    // Obtener total de elementos (sin límite)
    if (userId) {
      total = (await get("posts", `?userId=${userId}`)).length;
    } else {
      total = (await get("posts")).length;
    }

    await cargarPagina();
  } catch (e) {
    error.textContent = "Error " + e.message;
  }
})();

pageSize.addEventListener("change", () => {
  itemsPorPagina = pageSize.value;
  localStorage.setItem("posts_pageSize", itemsPorPagina);
  paginaActual = 1;
  cargarPagina();
});

filtro.addEventListener("input", () => {
  paginaActual = 1;
  cargarPagina();
});

async function cargarPagina() {
  try {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const start = (paginaActual - 1) * Number(itemsPorPagina);
    const limit = Number(itemsPorPagina);

    let query = `?_start=${start}&_limit=${limit}`;

    if (userId) query = `?userId=${userId}&_start=${start}&_limit=${limit}`;

    datos = await get("posts", query);

    actualizar();
  } catch (e) {
    error.textContent = "Error " + e.message;
  }
}

function actualizar() {
  let filtrados = datos.filter((p) =>
    p.title.toLowerCase().includes(filtro.value.toLowerCase())
  );

  mostrarDatos(filtrados, contenedor, pintarItem);

  crearPaginador(
    paginador,
    Array(total).fill(0),
    itemsPorPagina,
    paginaActual,
    (nueva) => {
      paginaActual = nueva;
      cargarPagina();
    }
  );
}

function pintarItem(p, contenedor) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${p.id} - ${p.title}</p>
    <button onclick="location.href='./comments.html?postId=${p.id}'">Ver comentarios</button>
  `;
  contenedor.appendChild(div);
}
