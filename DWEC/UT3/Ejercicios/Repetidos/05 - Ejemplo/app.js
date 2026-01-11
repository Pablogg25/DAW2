// Elementos
let usuarios = [];
let posts = [];
let comentarios = [];
let todos = [];

let filtrados = [];
let calcenlado = false;

const estado = document.getElementById("estado");

const listaUsuarios = document.getElementById("listaUsuarios");
const listaPosts = document.getElementById("listaPosts");
const listaComentarios = document.getElementById("listaComentarios");
const listaTodos = document.getElementById("listaTodos");

const buscadorUsuarios = document.getElementById("buscadorUsuarios");
const buscadorPosts = document.getElementById("buscadorPosts");
const buscadorComentarios = document.getElementById("buscadorComentarios");
const buscadorTodos = document.getElementById("buscadorTodos");

let usuarioSeleccionado = null;
let postSeleccionado = null;
let comentarioSeleccionado = null;
let todoSeleccionado = null;

const chkMujer = document.getElementById("mujer");
const chkHombre = document.getElementById("hombre");

cargarUsuarios();

async function cargarUsuarios() {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users");
    usuarios = await response.json();
    filtrados = usuarios;
    console.log(usuarios);
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

  // Siempre partimos de la lista completa
  let filtrados = usuarios.filter((u) => u.name.toLowerCase().includes(texto));

  // Filtro mujer
  if (chkMujer.checked) {
    filtrados = filtrados.filter((u) => u.gender === "female");
    chkHombre.checked = false;
  }

  // Filtro hombre
  if (chkHombre.checked) {
    filtrados = filtrados.filter((u) => u.gender === "male");
    chkMujer.checked = false;
  }

  pintarUsuarios(filtrados);
}
