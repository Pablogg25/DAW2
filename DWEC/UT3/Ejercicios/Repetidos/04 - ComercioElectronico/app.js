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

// Carga Inicial
cargarUsuarios();
cargarProductos();

// Cargar Usuarios
async function cargarUsuarios() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    usuarios = data.users;

    usuarios.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = `${u.firstName} ${u.lastName}`;
      selectUsuarios.appendChild(opt);
    });
  } catch (e) {
    estado.textContent = "Error cargango usuarios " + e;
  }
}

// Cargar Productos
async function cargarProductos() {
  try {
    const res = await fetch("https://dummyjson.com/products");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    if (!data.products) {
      throw new Error("La API no devolvió 'products'");
    }

    productos = data.products;

    categorias = [
      ...new Set(
        productos
          .map((p) => p.category)
          .filter((cat) => typeof cat === "string")
      ),
    ];

    categorias.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      filtroCategoria.appendChild(opt);
    });

    pintarProductos(productos);
  } catch (e) {
    estado.textContent = "Error cargando productos: " + e.message;
    console.error(e);
  }
}

// Pintar Productos

function pintarProductos(lista) {
  listaProductos.innerHTML = "";

  lista.forEach((p) => {
    const card = document.createElement("div");
    card.className = "producto";

    const img = document.createElement("img");
    img.src = p.thumbnail;

    const titulo = document.createElement("h3");
    titulo.textContent = p.title;

    const precio = document.createElement("p");
    precio.textContent = p.price + "€";

    const btnDetalles = document.createElement("button");
    btnDetalles.textContent = "Detalles";
    btnDetalles.onclick = () => {
      abrirModal(p);
    };

    const btnCarrito = document.createElement("button");
    btnCarrito.textContent = "Añadir al Carrito";
    btnCarrito.onclick = () => {
      añadirAlCarrito(p.id);
    };

    card.append(img, titulo, precio, btnDetalles, btnCarrito);
    listaProductos.appendChild(card);
  });
}
