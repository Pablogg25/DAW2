// 1. Estado global
let clientes = [];
let clienteEditando = null;

// 2. Referencias DOM principales
const contenedor = document.getElementById("contenedor");
// aquí crearás: buscador, botones, formularios, tabla, estado...
let buscadorInput;
let btnBuscarServidor;
let btnRecargar;
let zonaEstado;
let tablaDiv;
let formCrear;
let formEditar;

const API = "http://localhost:8000/clientes";

// 3. Función init()
function init() {
  crearInterfaz(); // crea formulario, tabla, etc.
  cargarClientes(); // GET inicial
}

// 4. crearInterfaz()

// - crear buscador + botones
// - crear contenedor de estado
// - crear contenedor tabla (.tabla)
// - crear formCrear y formEditar
// - añadir eventos a formularios y botones

function crearInterfaz() {
  const zonaBuscador = document.createElement("div");

  // Buscador y botones
  buscadorInput = document.createElement("input");
  buscadorInput.id = "buscador";
  buscadorInput.type = "text";
  buscadorInput.placeholder = "Buscar Clientes...";

  btnBuscarServidor = document.createElement("button");
  btnBuscarServidor.textContent = "Buscar en servidor";

  btnRecargar = document.createElement("button");
  btnRecargar.textContent = "Recargar";

  zonaBuscador.appendChild(buscadorInput);
  zonaBuscador.appendChild(btnBuscarServidor);
  zonaBuscador.appendChild(btnRecargar);

  contenedor.appendChild(zonaBuscador);

  // Estado
  zonaEstado = document.createElement("p");
  zonaEstado.id = "estado";
  contenedor.appendChild(zonaEstado);

  // Tabla contendor
  tablaDiv = document.createElement("div");
  tablaDiv.classList.add("tabla");
  contenedor.appendChild(tablaDiv);

  // Cabecera tabla
  const filaCabecera = document.createElement("div");
  filaCabecera.classList.add("fila", "cabecera");

  const cabeceras = [
    "ID",
    "Nombre",
    "Apellidos",
    "Telefono",
    "Tipo",
    "Activo",
    "FechaNac",
    "Acciones",
  ];

  cabeceras.forEach((texto) => {
    const celda = document.createElement("div");
    celda.textContent = texto;
    filaCabecera.appendChild(celda);
  });
  tablaDiv.appendChild(filaCabecera);

  //   Formulario Crear
  formCrear = document.createElement("form");
  formCrear.id = "formCrear";

  formCrear.innerHTML = `
    <h2>Nuevo Cliente</h2>

    <label>Nombre: </label>
    <input type="text" name="apellidos" required minlength="2" />
  `;
}

// 5. cargarClientes()  -> async/await GET
async function cargarClientes() {
  try {
    mostrarEstado("Cargando clientes");
    await esperar(300);

    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Error HTTP " + response.estatus);
    }

    clientes = await response.json();
    pintarTabla(clientes);
    mostrarEstado("Clientes cargados correctamente");
  } catch (e) {
    mostrarEstado("Error cargando los clientes " + e.message);
  }
}
// 6. pintarTabla(clientes)
function pintarTabla(listaClientes) {
  // Borrar todas las filas excepto la cabecera (primer hijo)
  while (tablaDiv.children.length > 1) {
    tablaDiv.removeChild(tablaDiv.lastChild);
  }

  listaClientes.forEach((c) => {
    const fila = document.createElement("div");
    fila.classList.add("fila");
    fila.dataset.id = c.id;

    // Celdas
    const celdaId = document.createElement("div");
    celdaId.textContent = c.id;

    const celdaNombre = document.createElement("div");
    celdaNombre.textContent = c.nombre;

    const celdaApellidos = document.createElement("div");
    celdaApellidos.textContent = c.apellidos;

    const celdaTelefono = document.createElement("div");
    celdaTelefono.textContent = c.telefono;

    const celdaTipo = document.createElement("div");
    celdaTipo.textContent = c.tipoCliente;

    const celdaActivo = document.createElement("div");
    celdaActivo.textContent = c.activo ? "Sí" : "No";

    const celdaFecha = document.createElement("div");
    celdaFecha.textContent = c.fechaNacimiento;

    const celdaAcciones = document.createElement("div");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.dataset.accion = "editar";
    btnEditar.dataset.id = c.id;

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Eliminar";
    btnBorrar.dataset.accion = "borrar";
    btnBorrar.dataset.id = c.id;

    celdaAcciones.appendChild(btnEditar);
    celdaAcciones.appendChild(btnBorrar);

    fila.appendChild(celdaId);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellidos);
    fila.appendChild(celdaTelefono);
    fila.appendChild(celdaTipo);
    fila.appendChild(celdaActivo);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaAcciones);

    tablaDiv.appendChild(fila);
  });
}
// 7. eventos de Editar/Eliminar (delegación o querySelectorAll)

// 8. crearCliente()    -> submit formCrear (POST + FormData)
// 9. cargarClienteParaEditar(id) -> GET /clientes/{id}
// 10. editarCliente()   -> submit formEditar (PUT + FormData)
// 11. borrarCliente(id) -> DELETE
// 12. filtrarEnDom()    -> input buscador (filtra array clientes)
// 13. buscarEnServidor() -> GET /clientes?q=texto

// 14. mostrarEstado(mensaje, callback)
function mostrarEstado(mensaje, callback) {
  if (zonaEstado) {
    zonaEstado.textContent = mensaje;
  }
  if (callback) callback();
}
// 15. esperar(ms) -> Promise
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", init);
