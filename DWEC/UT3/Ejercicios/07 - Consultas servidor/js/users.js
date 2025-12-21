import { get } from "./api.js";

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");

let datos = [];
let paginaActual = 1;
localStorage.setItem("Paginas", pageSize.value);

let itemsPorPagina = localStorage.getItem("Paginas");
(async () => {
  try {
    datos = await get("users");
    mostrarDatos();
    crearPaginador();
  } catch (e) {
    error.textContent = "Error: " + e.message;
  }
})();

pageSize.addEventListener("change", () => {
  itemsPorPagina = pageSize.value;
  localStorage.setItem("Paginas", itemsPorPagina);
  mostrarDatos();
  crearPaginador();
  paginaActual = 1;
});

filtro.addEventListener("input", () => {
  mostrarDatos();
  crearPaginador();
  paginaActual = 1;
});

//FUNCIONES

function mostrarDatos() {
  contenedor.innerHTML = "";

  const filtrados = datos.filter((u) =>
    u.name.toLowerCase().includes(filtro.value.toLowerCase())
  );

  if (itemsPorPagina === "all") {
    filtrados.forEach((u) => pintarItem(u));
    return;
  }

  const inicio = (paginaActual - 1) * Number(itemsPorPagina);
  const fin = inicio + Number(itemsPorPagina);
  const pagina = filtrados.slice(inicio, fin);

  pagina.forEach((u) => pintarItem(u));

  function pintarItem(u) {
    const div = document.createElement("div");
    div.innerHTML = `
    <p>${u.id} - ${u.name}</p>
    <button onclick="location.href='./todos.html?userId=${u.id}'">Ver Pendientes</button>
    <button onclick="location.href='./albums.html?userId=${u.id}'">Ver albumes</button>
    <button onclick="location.href=./posts.html?userId=${u.id}'">Ver posts</button>
    `;
    contenedor.appendChild(div);
  }
}

function crearPaginador() {
  paginador.innerHTML = "";
  const filtrados2 = datos.filter((u) =>
    u.name.toLowerCase().includes(filtro.value.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados2.length / itemsPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const div = document.createElement("div");
    div.classList.add("pagina");
    if (i === paginaActual) div.classList.add("activa");

    div.textContent = i;
    div.addEventListener("click", () => {
      paginaActual = i;
      mostrarDatos();
      crearPaginador();
    });
    paginador.appendChild(div);
  }
}
