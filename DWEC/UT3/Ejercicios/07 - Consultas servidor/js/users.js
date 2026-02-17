import { get, update } from "./api.js";
import { crearPaginador, mostrarDatos } from "./utils.js";

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");
let pagina = null;

let datos = [];
let paginaActual = 1;
let itemsPorPagina;
if (window.location.pathname.endsWith("users.html")) {
  // alert(window.location.pathname.endsWith("users.html"));
  localStorage.setItem("Paginas", pageSize.value);
  itemsPorPagina = localStorage.getItem("Paginas");

  (async () => {
    try {
      datos = await get("users");
      actualizar();
    } catch (e) {
      error.textContent = "Error " + e.message;
    }
  })();

  pageSize.addEventListener("change", () => {
    itemsPorPagina = pageSize.value;
    localStorage.setItem("paginasUsers", itemsPorPagina);
    paginaActual = 1;
    actualizar();
  });

  filtro.addEventListener("input", () => {
    paginaActual = 1;
    actualizar();
  });

  function actualizar() {
    let filtrados = datos.filter((u) =>
      u.name.toLowerCase().includes(filtro.value.toLowerCase())
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
}

function pintarItem(u) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${u.id} - ${u.name}</p>
onclick="location.href='./todos.html?userId=${u.id}'"    <button >Ver Pendientes</button>
    <button onclick="location.href='./albums.html?userId=${u.id}'">Ver albumes</button>
    <button onclick="location.href='./posts.html?userId=${u.id}'">Ver posts</button>
<button onclick="window.location.href='./formularioUsuario.html?userId=${u.id}'">Editar</button>
    `;
  //     const usuario = {
  //     id: 10,
  //     nombre: "Juan",
  //     edad: 30
  // };

  // localStorage.setItem("usuario", JSON.stringify(usuario));
  // window.location.href = "paginaB.html";
  // const usuario = JSON.parse(localStorage.getItem("usuario"));
  // console.log(usuario);
  contenedor.appendChild(div);
}

if (window.location.pathname.endsWith("formularioUsuario.html")) {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  const form = document.getElementById("form");
  const volver = document.getElementById("volver");
  (async () => {
    try {
      const u = await get("users", `/${userId}`);
      console.log(u.id);
      document.getElementById("id").value = u.id;
      document.getElementById("nombre").value = u.name;
      document.getElementById("username").value = u.username;
      document.getElementById("email").value = u.email;
      document.getElementById("phone").value = u.phone;
      document.getElementById("web").value = u.website;
      // document.getElementById("street").value = u.address.street;
    } catch (e) {
      error.textContent = "Error: " + e.message;
    }
  })();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      name: document.getElementById("nombre").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      website: document.getElementById("web").value,
    };

    try {
      const respuesta = await update("users", `/${userId}`, datos);
      alert(JSON.stringify(respuesta));
    } catch (e) {
      error.textContent = "Error: " + e.message;
    }
  });
  volver.addEventListener("click", () => {
    window.location.href = "./users.html";
  });
}
