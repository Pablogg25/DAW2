// Variables y Referencias
const contenedorLibros = document.getElementById("contenedorLibros");
const formLibro = document.getElementById("formLibro");
const btnMostrarFormulario = document.getElementById("btnMostrarFormulario");
const btnCancelar = document.getElementById("btnCancelar");
const errores = document.getElementById("errores");
const respuestaApi = document.getElementById("respuestaApi");
const debug = document.getElementById("debug");

const inputId = document.getElementById("libroId");
const inputTitulo = document.getElementById("titulo");
const inputAutor = document.getElementById("autor");
const inputGenero = document.getElementById("genero");
const inputDescripcion = document.getElementById("descripcion");

let libros = [];

// Cargar libros
async function cargarLibros() {
  try {
    const response = await fetch(
      "https://fakerapi.it/api/v2/books?quantity=15"
    );
    if (!response.ok) throw new Error("Error HTTP: " + response.status);
    const data = await response.json();
    libros = data.data;

    pintarLibros();
    console.log(libros);
  } catch (e) {
    contenedorLibros.textContent =
      "Error en la carga de los libros: " + e.message;
  }
}

cargarLibros();

// Pintar libros en DOM

function pintarLibros() {
  contenedorLibros.innerHTML = "";
  libros.forEach((libro, index) => {
    const div = document.createElement("div");
    div.className = "libro";
    div.dataset.index = index;

    const h3 = document.createElement("h3");
    h3.textContent = libro.title;

    const autor = document.createElement("p");
    autor.textContent = "Autor: " + libro.author;

    const genero = document.createElement("p");
    genero.textContent = "Genero: " + libro.genre;

    const descripcion = document.createElement("p");
    descripcion.textContent = "Descripcion: " + libro.description;
    descripcion.style.display = "none";

    const botones = document.createElement("div");
    botones.className = "botones";

    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver más";
    btnVer.onclick = () => {
      descripcion.style.display =
        descripcion.style.display === "none" ? "block" : "none";
    };

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => {
      cargarFormularioEdicion(index);
    };

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      eliminarLibro(index);
    };
    const btnDetalles = document.createElement("button");
    btnDetalles.textContent = "Detalles";
    btnDetalles.onclick = () => mostrarDialogo(libro);

    botones.appendChild(btnVer);
    botones.appendChild(btnEditar);
    botones.appendChild(btnEliminar);
    botones.appendChild(btnDetalles);

    div.appendChild(h3);
    div.appendChild(autor);
    div.appendChild(genero);
    div.appendChild(descripcion);
    div.appendChild(botones);

    contenedorLibros.appendChild(div);
  });
}

// Mostar Formulario
btnMostrarFormulario.onclick = () => {
  formLibro.style.display = "block";
  limpiarFormulario();
};

btnCancelar.onclick = () => {
  formLibro.style.display = "none";
  limpiarFormulario();
};

// Cargar Formulario para editar
function cargarFormularioEdicion(index) {
  const libro = libros[index];

  inputId.value = index;
  inputTitulo.value = libro.title;
  inputAutor.value = libro.author;
  inputGenero.value = libro.genre;
  inputDescripcion.value = libro.description;

  formLibro.style.display = "block";
}

// Validaciones
function validarFormulario() {
  errores.innerHTML = "";
  let mensajes = [];

  if (inputTitulo.value.trim().length < 1)
    mensajes.push("El título es obligatorio.");

  if (inputAutor.value.trim().length < 1)
    mensajes.push("El autor es obligatorio.");

  if (inputGenero.value.trim().length < 1)
    mensajes.push("El género es obligatorio.");

  if (inputDescripcion.value.trim().length < 10)
    mensajes.push("La descripción debe tener al menos 10 caracteres.");

  if (mensajes.length > 0) {
    errores.innerHTML = mensajes.join("<br>");
    return false;
  }

  return true;
}

// Guardar / Editar
formLibro.onsubmit = async (e) => {
  e.preventDefault();

  if (!validarFormulario()) return;

  const libro = {
    title: inputTitulo.value,
    author: inputAutor.value,
    genre: inputGenero.value,
    description: inputDescripcion.value,
  };

  const index = inputId.value;

  if (index === "") {
    await crearLibro(libro);
  } else {
    await actualizarLibro(libro, index);
  }

  formLibro.style.display = "none";
  limpiarFormulario();
  pintarLibros();
};

// Crear libro
async function crearLibro(libro) {
  try {
    let operacionCancelada = false;
    respuestaApi.innerHTML = "";

    const texto = document.createElement("span");
    texto.textContent = "Guardando...";
    respuestaApi.appendChild(texto);

    const btn1 = document.createElement("button");
    btn1.textContent = "Cancelar";
    respuestaApi.appendChild(btn1);
    btn1.onclick = () => {
      texto.textContent = "Operacion Cancelada";
      respuestaApi.removeChild(btn1);
      operacionCancelada = true;
    };
    await promesa();

    if (operacionCancelada) {
      respuestaApi.innerHTML = "";
      return;
    }
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(libro),
    });
    const data = await response.json();
    // alert(response.status);
    respuestaApi.textContent = JSON.stringify(data);
    libros.push(libro);

    despuesDeGuardar(() => {
      debug.textContent = "Callback despues de guardar";
    });
  } catch (e) {}
}

// Actualizar Libro
async function actualizarLibro(libro, index) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + index,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro),
      }
    );
    const data = await response.json();
    // alert(response.status);
    respuestaApi.textContent = JSON.stringify(data);
    libros.push(libro);
  } catch (e) {}
}

// Eliminar Libro
async function eliminarLibro(index) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + index,
      {
        method: "DELETE",
      }
    );
    libros.splice(index, 1);
    // alert(index);
    pintarLibros();
  } catch (e) {}
}

// Callback
function despuesDeGuardar(Callback) {
  Callback();
}

// Promesa
function promesa() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // ← OBLIGATORIO
    }, 3000);
  });
}

// Limpìar Fomulario
function limpiarFormulario() {
  inputId.value = "";
  inputTitulo.value = "";
  inputAutor.value = "";
  inputGenero.value = "";
  inputDescripcion.value = "";
  errores.innerHTML = "";
}

// Detalles
function mostrarDialogo(libro) {
  document.getElementById("dialogoTitulo").textContent = libro.title;
  document.getElementById("dialogoAutor").textContent =
    "Autor: " + libro.author;
  document.getElementById("dialogoGenero").textContent =
    "Genero: " + libro.genre;
  document.getElementById("dialogoDescripcion").textContent =
    "Descripcion: " + libro.description;
  document.getElementById("dialogoISBN").textContent = "ISBN: " + libro.isbn;
  const url = libro.image;
  const nueva = url.replace(".com", ".dev");
  console.log(nueva);
  document.getElementById("dialogoImagen").src = nueva;

  document.getElementById("dialogo").style.display = "block";
}
