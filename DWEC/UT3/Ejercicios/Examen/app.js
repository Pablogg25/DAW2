const API = "http://127.0.0.1:8000/clientes";
const contenedor = document.getElementById("contenedor");

let clientes = [];

let buscadorInput;
let btnBuscarCliente;
let btnCrearCliente;
let tablaDiv;

function init() {
  cargarInterfaz();
  cargarClientes();
}

function cargarInterfaz() {
  const zonaBuscador = document.createElement("div");

  buscadorInput = document.createElement("input");
  buscadorInput.type = "text";
  buscadorInput.placeholder = "Buscar Cliente...";

  btnBuscarCliente = document.createElement("button");
  btnBuscarCliente.id = btnBuscarCliente;
  btnBuscarCliente.textContent = "Buscar";

  btnCrearCliente = document.createElement("button");
  btnCrearCliente.id = "btnCrearCliente";
  btnCrearCliente.textContent = "Crear";

  zonaBuscador.appendChild(buscadorInput);
  zonaBuscador.appendChild(btnBuscarCliente);
  zonaBuscador.appendChild(btnCrearCliente);

  contenedor.appendChild(zonaBuscador);

  //   tabla
  tablaDiv = document.createElement("div");
  tablaDiv.id = "tablaDiv";
  tablaDiv.classList.add("tabla");

  //   cabecera
  const cabeceraTabla = document.createElement("div");
  cabeceraTabla.classList.add("fila", "cabecera");

  const cabeceras = [
    "ID",
    "Nombre",
    "Apellidos",
    "Teléfono",
    "Tipo",
    "Activo",
    "Fecha Nac.",
    "Acciones",
  ];

  cabeceras.forEach((cabecera) => {
    let div = document.createElement("div");
    div.textContent = cabecera;
    cabeceraTabla.appendChild(div);
  });
  contenedor.appendChild(cabeceraTabla);
}

function pintarTabla(lista) {
  lista.forEach((cliente) => {
    const fila = document.createElement("div");
    fila.classList.add("fila");
    fila.dataset.id = cliente.id;

    const celdaId = document.createElement("div");
    celdaId.textContent = cliente.id;

    const celdaNombre = document.createElement("div");
    celdaNombre.textContent = cliente.nombre;

    const celdaApellidos = document.createElement("div");
    celdaApellidos.textContent = cliente.apellidos;

    const celdaTelefono = document.createElement("div");
    celdaTelefono.textContent = cliente.telefono;

    const celdaTipo = document.createElement("div");
    celdaTipo.textContent = cliente.tipo;

    const celdaActivo = document.createElement("div");
    celdaActivo.textContent = cliente.activo;

    const celdaFechaNac = document.createElement("div");
    celdaFechaNac.textContent = cliente.fechaNacimiento;

    const celdaAcciones = document.createElement("div");
    const btnVerCliente = document.createElement("button");
    const btnBorrarCliente = document.createElement("button");
    btnVerCliente.textContent = "Ver";
    btnBorrarCliente.textContent = "Eliminar";

    celdaAcciones.appendChild(btnVerCliente);
    celdaAcciones.appendChild(btnBorrarCliente);

    fila.appendChild(celdaId);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellidos);
    fila.appendChild(celdaTelefono);
    fila.appendChild(celdaTipo);
    fila.appendChild(celdaActivo);
    fila.appendChild(celdaFechaNac);
    fila.appendChild(celdaAcciones);

    tablaDiv.appendChild(fila);
    contenedor.appendChild(tablaDiv);
  });
}

async function cargarClientes() {
  try {
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Error HTTP " + res.status);
    }

    clientes = await res.json();
    console.log(clientes);
    pintarTabla(clientes);
    // mostrarEstado("Clientes cargados correctamente");
  } catch (e) {
    // mostrarEstado("Error cargando clientes: " + e.message);
  }
}

init();
