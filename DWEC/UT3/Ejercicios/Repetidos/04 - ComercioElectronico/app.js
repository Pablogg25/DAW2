// Basicos
let productos = [];
let categorias = [];
let usuarios = [];
let carrito = null;
let usuarioSeleccionado = null;
let cancelarOperacion = false;

// Elementos
const listaProductos = document.getElementById("listaProductos");
const selectUsuarios = document.getElementById("selectUsuarios");
const filtroCategoria = document.getElementById("filtroCategoria");
const buscador = document.getElementById("buscador");
const carritoDiv = document.getElementById("carrito");
const estado = document.getElementById("estado");

const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalImagen = document.getElementById("modalImagen");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalPrecio = document.getElementById("modalPrecio");
const modalCategoria = document.getElementById("modalCategoria");
const modalStock = document.getElementById("modalStock");
const modalImagenesExtra = document.getElementById("modalImagenesExtra");
const modalAgregarCarrito = document.getElementById("modalAgregarCarrito");

// Funcion de carga simulada con cancelacion
function esperar(ms) {
  return new Promise((resolve) => {
    cancelarOperacion = false;

    estado.textContent = "Procesando...\nPulsta cancelar para detener";

    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.onclick = () => {
      cancelarOperacion = true;
      estado.textContent = "Operacion cancelada por el usuario.";
    };

    estado.appendChild(btnCancelar);

    setTimeout(() => {
      if (!cancelarOperacion) resolve();
    }, ms);
  });
}
