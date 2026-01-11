const API = "https://gorest.co.in/public/v2";
const TOKEN =
  "efdcb59dad3644beb8fed92d555466a355fff30d5632fbcc7d19ae007fb40fa2";
// Elementos
let usuarios = [];
let posts = [];
let comentarios = [];
let todos = [];

let filtrados = [];
let cancelado = false;

let usuarioSeleccionado = null;
let postSeleccionado = null;
let comentarioSeleccionado = null;
let todoSeleccionado = null;

const estado = document.getElementById("estado");

const listaUsuarios = document.getElementById("listaUsuarios");
const listaPosts = document.getElementById("listaPosts");
const listaComentarios = document.getElementById("listaComentarios");
const listaTodos = document.getElementById("listaTodos");

const buscadorUsuarios = document.getElementById("buscadorUsuarios");
const buscadorPosts = document.getElementById("buscadorPosts");
const buscadorComentarios = document.getElementById("buscadorComentarios");
const buscadorTodos = document.getElementById("buscadorTodos");

const chkMujer = document.getElementById("mujer");
const chkHombre = document.getElementById("hombre");

cargarUsuarios();

async function cargarUsuarios() {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users");
    usuarios = await response.json();
    filtrados = usuarios;
    // console.log(usuarios);
    pintarUsuarios(usuarios);
  } catch (e) {
    estado.textContent = "Error al cargar los usuarios " + e;
  }
}

function pintarUsuarios(lista) {
  listaUsuarios.innerHTML = "";
  lista.forEach((u) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>${u.name}</h3> 
    <p>${u.email}</p> 
    <p>${u.gender}</p> 
    <p>${u.status}</p> 
    <br> 
    <button data-id="${u.id}" class="verPosts">Ver Posts</button> 
    <button data-id="${u.id}" class="verTodos">Ver Tareas</button> 
    <button data-id="${u.id}" class="verComentarios">Ver Comentarios</button>
    <button data-id="${u.id}" class="editarUsuario">Editar Usuario</button> 
    <button data-id="${u.id}" class="borrarUsuario">Eliminar Usuario</button> `;
    listaUsuarios.appendChild(div);
  });
  eventosUsuario();
}

function eventosUsuario() {
  document.querySelectorAll(".verPosts").forEach((btn) => {
    btn.onclick = () => {
      usuarioSeleccionado = btn.dataset.id;
      cargarPosts(usuarioSeleccionado);
    };
  });
  document.querySelectorAll(".verTodos").forEach((btn) => {
    btn.onclick = () => {
      usuarioSeleccionado = btn.dataset.id;
      cargarTodos(usuarioSeleccionado);
    };
  });
  document.querySelectorAll(".verComentarios").forEach((btn) => {
    btn.onclick = () => {
      usuarioSeleccionado = btn.dataset.id;
      cargarComentarios(usuarioSeleccionado);
    };
  });

  document.querySelectorAll(".editarUsuario").forEach((btn) => {
    btn.onclick = () => editarUsuario(btn.dataset.id);
  });
  document.querySelectorAll(".borrarUsuario").forEach((btn) => {
    btn.onclick = () => borrarUsuario(btn.dataset.id);
  });
}

function aplicarFiltros() {
  let texto = buscadorUsuarios.value.toLowerCase();
  let resultado = usuarios.filter((u) => u.name.toLowerCase().includes(texto));
  if (chkMujer.checked) {
    resultado = resultado.filter((u) => u.gender === "female");
    chkHombre.checked = false;
  }
  if (chkHombre.checked) {
    resultado = resultado.filter((u) => u.gender === "male");
    chkMujer.checked = false;
  }
  filtrados = resultado;
  pintarUsuarios(resultado);
}

buscadorUsuarios.addEventListener("input", aplicarFiltros);
chkMujer.addEventListener("click", aplicarFiltros);
chkHombre.addEventListener("click", aplicarFiltros);

async function editarUsuario(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  const nombre = prompt("NuevoNombre: ");
  if (!nombre) return;

  try {
    await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nombre }),
    });

    estado.textContent = "Estado Actualizado";
    cargarUsuarios();
  } catch (e) {
    estado.textContent = "Error editantdo el usuario " + e;
  }
}

async function borrarUsuario(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  if (!confirm("¿Seguro?")) return;

  try {
    await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    estado.textContent = "Usuario Eliminado";
    cargarUsuarios();
  } catch (e) {
    estado.textContent = "Error eliminado usuario " + e;
  }
}
