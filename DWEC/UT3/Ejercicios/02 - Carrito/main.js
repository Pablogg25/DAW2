import API from "./api.js";

const loginSection = document.getElementById("loginSection");
const tiendaSection = document.getElementById("tiendaSection");

const listaProductos = document.getElementById("listaProductos");
const filtro = document.getElementById("filtro");
const carritoDiv = document.getElementById("carrito");
const procesarPedidoBtn = document.getElementById("procesarPedidoBtn");

const state = {
  carrito: [], // { nombre, precio, cantidad }
};

// -----------------------------
// LOGIN
// -----------------------------
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);

  try {
    const data = await API.validarUsuario(f.get("username"), f.get("password"));

    localStorage.setItem("token", data.access_token);

    loginSection.style.display = "none";
    tiendaSection.style.display = "block";

    cargarProductos();
  } catch (err) {
    alert("Usuario o contraseña incorrectos");
  }
});

// -----------------------------
// LISTAR PRODUCTOS
// -----------------------------
async function cargarProductos() {
  const categoria = filtro.value;
  const productos = await API.obtenerProductos(categoria, 1);

  listaProductos.innerHTML = "";

  productos.forEach((p) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <strong>${p.nombre}</strong> - ${p.precio}€
      <button class="add">Añadir</button>
    `;

    div.querySelector(".add").onclick = () => addCarrito(p);

    listaProductos.appendChild(div);
  });
}

filtro.addEventListener("input", cargarProductos);

// -----------------------------
// CARRITO
// -----------------------------
function addCarrito(p) {
  const linea = state.carrito.find((l) => l.nombre === p.nombre);

  if (linea) linea.cantidad++;
  else
    state.carrito.push({
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1,
    });

  renderCarrito();
}

function renderCarrito() {
  carritoDiv.innerHTML = "";

  state.carrito.forEach((l, i) => {
    const div = document.createElement("div");
    div.className = "linea";
    div.innerHTML = `
      ${l.nombre} x 
      <input type="number" min="1" value="${l.cantidad}">
      <button class="del">X</button>
    `;

    div.querySelector("input").onchange = (e) => {
      l.cantidad = Number(e.target.value);
    };

    div.querySelector(".del").onclick = () => {
      state.carrito.splice(i, 1);
      renderCarrito();
    };

    carritoDiv.appendChild(div);
  });
}

// -----------------------------
// PROCESAR PEDIDO
// -----------------------------
procesarPedidoBtn.addEventListener("click", async () => {
  if (state.carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const productoFake = {
    nombre: "Pedido " + Date.now(),
    precio: state.carrito.reduce((t, l) => t + l.precio * l.cantidad, 0),
    categoria: "pedido",
    activo: 1,
  };

  try {
    await API.crearProducto(productoFake);
    alert("Pedido procesado correctamente");

    state.carrito = [];
    renderCarrito();
  } catch {
    alert("Error al procesar pedido");
  }
});
