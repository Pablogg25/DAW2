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

    botones.appendChild(btnVer);
    botones.appendChild(btnEditar);
    botones.appendChild(btnEliminar);

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

// Limpìar Fomulario
function limpiarFormulario() {
  inputId.value = "";
  inputTitulo.value = "";
  inputAutor.value = "";
  inputGenero.value = "";
  inputDescripcion.value = "";
  errores.innerHTML = "";
}
