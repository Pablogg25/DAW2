/* ============================================================
   CONFIG
============================================================ */
const API = "https://gorest.co.in/public/v2";
const TOKEN =
  "efdcb59dad3644beb8fed92d555466a355fff30d5632fbcc7d19ae007fb40fa2";

/* ============================================================
   ESTADO GLOBAL
============================================================ */
let usuarios = [];
let posts = [];
let comentarios = [];
let todos = [];

let usuarioSeleccionado = null;
let postSeleccionado = null;

/* ============================================================
   ELEMENTOS DEL DOM
============================================================ */
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

/* ============================================================
   INICIO
============================================================ */
cargarUsuarios();

/* ============================================================
   CARGAR USUARIOS
============================================================ */
async function cargarUsuarios() {
  try {
    const response = await fetch(`${API}/users`);
    usuarios = await response.json();
    pintarUsuarios(usuarios);
  } catch (e) {
    estado.textContent = "Error al cargar los usuarios " + e;
  }
}

/* ============================================================
   PINTAR USUARIOS
============================================================ */
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
      <button data-id="${u.id}" class="borrarUsuario">Eliminar Usuario</button>
    `;

    listaUsuarios.appendChild(div);
  });

  eventosUsuario();
}

/* ============================================================
   EVENTOS USUARIOS
============================================================ */
function eventosUsuario() {
  document.querySelectorAll(".verPosts").forEach((btn) => {
    btn.onclick = () => {
      console.log("Click detectado en Ver Posts", btn.dataset.id);
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
      cargarComentariosUsuario(usuarioSeleccionado);
    };
  });

  document.querySelectorAll(".editarUsuario").forEach((btn) => {
    btn.onclick = () => editarUsuario(btn.dataset.id);
  });

  document.querySelectorAll(".borrarUsuario").forEach((btn) => {
    btn.onclick = () => borrarUsuario(btn.dataset.id);
  });
}

/* ============================================================
   FILTROS USUARIOS
============================================================ */
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

  pintarUsuarios(resultado);
}

buscadorUsuarios.addEventListener("input", aplicarFiltros);
chkMujer.addEventListener("click", aplicarFiltros);
chkHombre.addEventListener("click", aplicarFiltros);

/* ============================================================
   CRUD USUARIOS
============================================================ */
async function editarUsuario(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  const nombre = prompt("Nuevo nombre:");
  if (!nombre) return;

  try {
    await fetch(`${API}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nombre }),
    });

    estado.textContent = "Usuario actualizado";
    cargarUsuarios();
  } catch (e) {
    estado.textContent = "Error editando usuario " + e;
  }
}

async function borrarUsuario(id) {
  if (!TOKEN) return alert("Necesitas token para borrar");

  if (!confirm("¿Seguro?")) return;

  try {
    await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    estado.textContent = "Usuario eliminado";
    cargarUsuarios();
  } catch (e) {
    estado.textContent = "Error eliminando usuario " + e;
  }
}

/* ============================================================
   POSTS
============================================================ */
async function cargarPosts(userId) {
  console.log("➡️ cargarPosts() llamado con userId:", userId);

  try {
    const response = await fetch(`${API}/users/${userId}/posts`);
    console.log("➡️ Status de la API:", response.status);

    const data = await response.json();
    console.log("➡️ Posts recibidos:", data);

    posts = data;
    pintarPosts(posts);
  } catch (e) {
    console.error("❌ Error en cargarPosts:", e);
    estado.textContent = "Error cargando posts " + e;
  }
}

function pintarPosts(lista) {
  listaPosts.innerHTML = "";

  lista.forEach((p) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.body}</p>
      <button data-id="${p.id}" class="verComentariosPost">Ver Comentarios</button>
      <button data-id="${p.id}" class="editarPost">Editar</button>
      <button data-id="${p.id}" class="borrarPost">Eliminar</button>
    `;

    listaPosts.appendChild(div);
  });

  eventosPosts();
}

function eventosPosts() {
  document.querySelectorAll(".verComentariosPost").forEach((btn) => {
    btn.onclick = () => {
      postSeleccionado = btn.dataset.id;
      cargarComentarios(postSeleccionado);
    };
  });

  document.querySelectorAll(".editarPost").forEach((btn) => {
    btn.onclick = () => editarPost(btn.dataset.id);
  });

  document.querySelectorAll(".borrarPost").forEach((btn) => {
    btn.onclick = () => borrarPost(btn.dataset.id);
  });
}

/* ============================================================
   CRUD POSTS
============================================================ */
async function editarPost(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  const titulo = prompt("Nuevo título:");
  if (!titulo) return;

  try {
    await fetch(`${API}/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titulo }),
    });

    estado.textContent = "Post actualizado";
    cargarPosts(usuarioSeleccionado);
  } catch (e) {
    estado.textContent = "Error editando post " + e;
  }
}

async function borrarPost(id) {
  if (!TOKEN) return alert("Necesitas token para borrar");

  if (!confirm("¿Seguro?")) return;

  try {
    await fetch(`${API}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    estado.textContent = "Post eliminado";
    cargarPosts(usuarioSeleccionado);
  } catch (e) {
    estado.textContent = "Error eliminando post " + e;
  }
}

/* ============================================================
   COMENTARIOS
============================================================ */
async function cargarComentarios(postId) {
  try {
    const response = await fetch(`${API}/posts/${postId}/comments`);
    comentarios = await response.json();
    pintarComentarios(comentarios);
  } catch (e) {
    estado.textContent = "Error cargando comentarios " + e;
  }
}

async function cargarComentariosUsuario(userId) {
  try {
    const response = await fetch(`${API}/comments?user_id=${userId}`);
    comentarios = await response.json();
    pintarComentarios(comentarios);
  } catch (e) {
    estado.textContent = "Error cargando comentarios del usuario " + e;
  }
}

function pintarComentarios(lista) {
  listaComentarios.innerHTML = "";

  lista.forEach((c) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h4>${c.name}</h4>
      <p>${c.email}</p>
      <p>${c.body}</p>
      <button data-id="${c.id}" class="editarComentario">Editar</button>
      <button data-id="${c.id}" class="borrarComentario">Eliminar</button>
    `;

    listaComentarios.appendChild(div);
  });

  eventosComentarios();
}

function eventosComentarios() {
  document.querySelectorAll(".editarComentario").forEach((btn) => {
    btn.onclick = () => editarComentario(btn.dataset.id);
  });

  document.querySelectorAll(".borrarComentario").forEach((btn) => {
    btn.onclick = () => borrarComentario(btn.dataset.id);
  });
}

/* ============================================================
   CRUD COMENTARIOS
============================================================ */
async function editarComentario(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  const texto = prompt("Nuevo comentario:");
  if (!texto) return;

  try {
    await fetch(`${API}/comments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: texto }),
    });

    estado.textContent = "Comentario actualizado";
    cargarComentarios(postSeleccionado);
  } catch (e) {
    estado.textContent = "Error editando comentario " + e;
  }
}

async function borrarComentario(id) {
  if (!TOKEN) return alert("Necesitas token para borrar");

  if (!confirm("¿Seguro?")) return;

  try {
    await fetch(`${API}/comments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    estado.textContent = "Comentario eliminado";
    cargarComentarios(postSeleccionado);
  } catch (e) {
    estado.textContent = "Error eliminando comentario " + e;
  }
}

/* ============================================================
   TODOS
============================================================ */
async function cargarTodos(userId) {
  try {
    const response = await fetch(`${API}/users/${userId}/todos`);
    todos = await response.json();
    pintarTodos(todos);
  } catch (e) {
    estado.textContent = "Error cargando tareas " + e;
  }
}

function pintarTodos(lista) {
  listaTodos.innerHTML = "";

  lista.forEach((t) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h4>${t.title}</h4>
      <p>Estado: ${t.status}</p>
      <button data-id="${t.id}" class="editarTodo">Editar</button>
      <button data-id="${t.id}" class="borrarTodo">Eliminar</button>
    `;

    listaTodos.appendChild(div);
  });

  eventosTodos();
}

function eventosTodos() {
  document.querySelectorAll(".editarTodo").forEach((btn) => {
    btn.onclick = () => editarTodo(btn.dataset.id);
  });

  document.querySelectorAll(".borrarTodo").forEach((btn) => {
    btn.onclick = () => borrarTodo(btn.dataset.id);
  });
}

/* ============================================================
   CRUD TODOS
============================================================ */
async function editarTodo(id) {
  if (!TOKEN) return alert("Necesitas token para editar");

  const titulo = prompt("Nuevo título:");
  if (!titulo) return;

  try {
    await fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titulo }),
    });

    estado.textContent = "Tarea actualizada";
    cargarTodos(usuarioSeleccionado);
  } catch (e) {
    estado.textContent = "Error editando tarea " + e;
  }
}

async function borrarTodo(id) {
  if (!TOKEN) return alert("Necesitas token para borrar");

  if (!confirm("¿Seguro?")) return;

  try {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    estado.textContent = "Tarea eliminada";
    cargarTodos(usuarioSeleccionado);
  } catch (e) {
    estado.textContent = "Error eliminando tarea " + e;
  }
}
