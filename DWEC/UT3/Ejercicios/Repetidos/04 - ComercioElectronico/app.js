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
      agregarAlCarrito(p.id);
    };

    card.append(img, titulo, precio, btnDetalles, btnCarrito);
    listaProductos.appendChild(card);
  });
}

// Filtros y buscador
buscador.addEventListener("input", () => filtrarProductos());
filtroCategoria.addEventListener("change", () => filtrarProductos());

function filtrarProductos() {
  const texto = buscador.value.toLowerCase();
  const categoria = filtroCategoria.value;

  let filtrados = productos.filter((p) => {
    return p.title.toLowerCase().includes(texto);
  });

  if (categoria) {
    filtrados = filtrados.filter((p) => {
      return p.category === categoria;
    });
  }

  pintarProductos(filtrados);
}

// Seleccion de usuario y carga de carrito
selectUsuarios.addEventListener("change", async () => {
  usuarioSeleccionado = selectUsuarios.value;
  if (!usuarioSeleccionado) return;

  await cargarCarrito(usuarioSeleccionado);
});

async function cargarCarrito(userId) {
  try {
    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
    const data = await res.json();

    carrito =
      data.carts.length > 0 ? data.carts[0] : { products: [], userId: userId };

    pintarCarrito();
  } catch (e) {
    estado.textContent = "Error cargando carrito " + e;
  }
}

// Pintar Carrito
function pintarCarrito() {
  carritoDiv.innerHTML = "";

  if (!carrito || carrito.products.length === 0) {
    carritoDiv.textContent = "Carrito vacio";
    return;
  }

  carrito.products.forEach((item) => {
    const div = document.createElement("div");
    div.className = "itemCarrito";

    const nombre = document.createElement("span");
    nombre.textContent = item.title || `Producto ${item.id}`;

    const cantidad = document.createElement("span");
    cantidad.textContent = "x" + item.quantity;

    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = () => cambiarCantidad(item.id, 1);

    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = () => cambiarCantidad(item.id, -1);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarProducto(item.id);

    div.append(nombre, cantidad, btnMas, btnMenos, btnEliminar);
    carritoDiv.appendChild(div);
  });
}

// Cambiar Cantidad
function cambiarCantidad(id, delta) {
  const item = carrito.productos.find((p) => (p.id = id));
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) item.quantity = -1;

  pintarCarrito();
}

// Eliminar Producto del carrito
function eliminarProducto(id) {
  carrito.products = carrito.products.filter((p) => p.id !== id);
  pintarCarrito();
}

// Añadir Producto Al Carrito
function agregarAlCarrito(id) {
  if (!usuarioSeleccionado) {
    estado.textContent = "Selecciona un usuario antes de añadir";
    return;
  }

  const item = carrito.products.find((p) => {
    p.id === id;
  });

  if (item) {
    item.quantity++;
  } else {
    carrito.products.push({ id, quantity: 1 });
  }

  pintarCarrito();
}

// Guardar Carrito

document.getElementById("btnGuardarCarrito").onclick = async () => {
  if (!carrito) return;

  await esperar(1000);
  if (cancelarOperacion) return;

  try {
    const response = await fetch(`https://dummyjson.com/carts/${carrito.id}`, {
      method: "PUT",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(carrito),
    });

    const data = await response.json();
    estado.textContent = "Carrito guardado correctamente";
  } catch (e) {
    estado.textContent = "Error al guardar el carrito " + e;
  }
};

// Vaciar Carrito
document.getElementById("btnVaciarCarrito").onclick = () => {
  if (!carrito) return;
  carrito.products = [];
  pintarCarrito();
};

// Finalizar compra
document.getElementById("btnComprar").onclick = async () => {
  if (!carrito || carrito.products.length === 0) {
    estado.textContent = "No puedes comprar un carrito vacío.";
    return;
  }

  await esperar(1000);
  if (cancelarOperacion) return;

  try {
    await fetch(`https://dummyjson.com/carts/${carrito.id}`, {
      method: "DELETE",
    });

    carrito.products = [];
    pintarCarrito();
    estado.textContent = "Compra realizada correctamente.";
  } catch (e) {
    estado.textContent = "Error al finalizar compra.";
  }
};

// Modal Detalles
function abrirModal(p) {
  modalTitulo.textContent = p.title;
  modalImagen.src = p.thumbnail;
  modalDescripcion.textContent = p.description;
  modalPrecio.textContent = "Precio: " + p.price + " €";
  modalCategoria.textContent = "Categoría: " + p.category;
  modalStock.textContent = "Stock: " + p.stock;

  modalImagenesExtra.innerHTML = "";
  p.images.forEach((img) => {
    const i = document.createElement("img");
    i.src = img;
    modalImagenesExtra.appendChild(i);
  });

  modalAgregarCarrito.onclick = () => agregarAlCarrito(p.id);

  modal.style.display = "flex";
}

cerrarModal.onclick = () => (modal.style.display = "none");
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
