const alumnos = [
  { alumnoId: 1, nombre: "Ana López", ciclo: "DAW" },
  { alumnoId: 2, nombre: "Laura Sánchez", ciclo: "ASIR" },
  { alumnoId: 3, nombre: "Carlos Martínez", ciclo: "DAM" },
  { alumnoId: 4, nombre: "Juan Pérez", ciclo: "ASIR" },
  { alumnoId: 5, nombre: "Mario Gómez", ciclo: "DAW" },
  { alumnoId: 6, nombre: "Lucía Torres", ciclo: "DAM" },
  { alumnoId: 7, nombre: "Sofía Núñez", ciclo: "ASIR" },
  { alumnoId: 8, nombre: "Clara Sánchez", ciclo: "DAW" },
  { alumnoId: 9, nombre: "Manuel Díaz", ciclo: "DAM" },
  { alumnoId: 10, nombre: "Pedro Torres", ciclo: "DAW" },
  { alumnoId: 11, nombre: "Elena Ruiz", ciclo: "DAM" },
  { alumnoId: 12, nombre: "Álvaro Morales", ciclo: "ASIR" },
];

const filtroEl = document.getElementById("filtro");
const listaIzq = document.getElementById("listaIzq");
const listaDer = document.getElementById("listaDer");
const btnDer = document.getElementById("btnDer");
const btnIzq = document.getElementById("btnIzq");
const mensajes = document.getElementById("mensajes");

let seleccionados = [];

function crearFila(a) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.id = a.alumnoId;

  const columnaNombre = document.createElement("span");
  columnaNombre.textContent = a.nombre;

  const columnaCiclo = document.createElement("span");
  columnaCiclo.textContent = a.ciclo;

  div.appendChild(columnaNombre);
  div.appendChild(columnaCiclo);

  div.onclick = () => div.classList.toggle("seleccionada");
  return div;
}

// Disponibles (izquierda): alumnos no seleccionados y que pasan el filtro
function cargarIzquierda() {
  listaIzq.innerHTML = "";
  const ciclo = filtroEl.value;
  alumnos.forEach((a) => {
    const yaSel = seleccionados.some((s) => s.alumnoId === a.alumnoId);
    const pasaFiltro = ciclo === "Todos" || ciclo === a.ciclo;
    if (!yaSel && pasaFiltro) {
      listaIzq.appendChild(crearFila(a));
    }
  });
}

// Seleccionados (derecha)
function cargarDerecha() {
  listaDer.innerHTML = "";
  seleccionados.forEach((a) => listaDer.appendChild(crearFila(a)));
}

// Mover a la derecha
btnDer.onclick = () => {
  const filas = listaIzq.querySelectorAll(".row.seleccionada");
  filas.forEach((r) => {
    const id = Number(r.dataset.id);
    const a = alumnos.find((x) => x.alumnoId === id);
    if (!seleccionados.some((s) => s.alumnoId === id)) {
      seleccionados.push(a);
    }
  });
  cargarIzquierda();
  cargarDerecha();
};

// Mover a la izquierda
btnIzq.onclick = () => {
  const filas = listaDer.querySelectorAll(".row.seleccionada");
  const ids = Array.from(filas).map((r) => Number(r.dataset.id));
  seleccionados = seleccionados.filter((s) => !ids.includes(s.alumnoId));
  cargarIzquierda();
  cargarDerecha();
};

// Filtro
filtroEl.onchange = cargarIzquierda;

// Enviar
document.getElementById("formSeleccion").onsubmit = (e) => {
  e.preventDefault();
  const ids = seleccionados.map((a) => a.alumnoId);
  const nombres = seleccionados.map((a) => a.nombre);
  const ciclos = seleccionados.map((a) => a.ciclo);
  const orden = seleccionados.map((_, i) => i + 1);
  const json = { alumnoId: ids, nombres, ciclos, orden };
  mensajes.textContent = JSON.stringify(json, null, 2);
};

// Inicial
cargarIzquierda();
cargarDerecha();
