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

// -----------------------------
// CREAR FILA
// -----------------------------
function crearFila(a, lado) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.id = a.alumnoId;

  const columnaNombre = document.createElement("span");
  columnaNombre.textContent = a.nombre;

  const columnaCiclo = document.createElement("span");
  columnaCiclo.textContent = a.ciclo;

  const columnaAcciones = document.createElement("span");

  div.appendChild(columnaNombre);
  div.appendChild(columnaCiclo);
  div.appendChild(columnaAcciones);

  div.onclick = (e) => {
    if (e.target.tagName === "BUTTON") return;
    div.classList.toggle("seleccionada");
  };

  // -----------------------------
  // AÑADIDO: Botones subir/bajar
  // -----------------------------
  if (lado === "der") {
    const btnUp = document.createElement("button");
    btnUp.textContent = "↑";
    btnUp.onclick = () => mover(a.alumnoId, -1);

    const btnDown = document.createElement("button");
    btnDown.textContent = "↓";
    btnDown.onclick = () => mover(a.alumnoId, +1);

    columnaAcciones.appendChild(btnUp);
    columnaAcciones.appendChild(btnDown);
  }

  return div;
}

// -----------------------------
// AÑADIDO: Reordenar seleccionados
// -----------------------------
function mover(id, dir) {
  const i = seleccionados.findIndex((x) => x.alumnoId === id);
  const j = i + dir;

  if (j < 0 || j >= seleccionados.length) return;

  const temp = seleccionados[i];
  seleccionados[i] = seleccionados[j];
  seleccionados[j] = temp;

  cargarDerecha();
}

// -----------------------------
// IZQUIERDA
// -----------------------------
function cargarIzquierda() {
  listaIzq.innerHTML = "";
  const ciclo = filtroEl.value;

  alumnos.forEach((a) => {
    const yaSel = seleccionados.some((s) => s.alumnoId === a.alumnoId);
    const pasaFiltro = ciclo === "Todos" || ciclo === a.ciclo;

    if (!yaSel && pasaFiltro) {
      listaIzq.appendChild(crearFila(a, "izq"));
    }
  });
}

// -----------------------------
// DERECHA
// -----------------------------
function cargarDerecha() {
  listaDer.innerHTML = "";
  seleccionados.forEach((a) => listaDer.appendChild(crearFila(a, "der")));
}

// -----------------------------
// MOVER A LA DERECHA
// -----------------------------
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

// -----------------------------
// MOVER A LA IZQUIERDA
// -----------------------------
btnIzq.onclick = () => {
  const filas = listaDer.querySelectorAll(".row.seleccionada");
  const ids = Array.from(filas).map((r) => Number(r.dataset.id));

  const ciclo = filtroEl.value;

  seleccionados = seleccionados.filter((s) => {
    if (!ids.includes(s.alumnoId)) return true;

    // -----------------------------
    // AÑADIDO: Comprobación de ciclo
    // -----------------------------
    if (ciclo === "Todos" || ciclo === s.ciclo) {
      return false; // se elimina
    }

    return true; // no se elimina si no pasa filtro
  });

  cargarIzquierda();
  cargarDerecha();
};

// -----------------------------
// FILTRO
// -----------------------------
filtroEl.onchange = cargarIzquierda;

// -----------------------------
// SUBMIT (con inputs ocultos)
// -----------------------------
document.getElementById("formSeleccion").onsubmit = (e) => {
  e.preventDefault();

  // limpiar inputs previos
  document.querySelectorAll(".hiddenInput").forEach((i) => i.remove());

  const form = document.getElementById("formSeleccion");

  seleccionados.forEach((a, i) => {
    const inputId = document.createElement("input");
    inputId.type = "hidden";
    inputId.className = "hiddenInput";
    inputId.name = "alumnoId[]";
    inputId.value = a.alumnoId;

    const inputNombre = document.createElement("input");
    inputNombre.type = "hidden";
    inputNombre.className = "hiddenInput";
    inputNombre.name = "nombres[]";
    inputNombre.value = a.nombre;

    const inputOrden = document.createElement("input");
    inputOrden.type = "hidden";
    inputOrden.className = "hiddenInput";
    inputOrden.name = "orden[]";
    inputOrden.value = i + 1;

    form.appendChild(inputId);
    form.appendChild(inputNombre);
    form.appendChild(inputOrden);
  });

  const json = {
    alumnoId: seleccionados.map((a) => a.alumnoId),
    nombres: seleccionados.map((a) => a.nombre),
    orden: seleccionados.map((_, i) => i + 1),
  };

  mensajes.textContent = JSON.stringify(json, null, 2);
};

// -----------------------------
// INICIAL
// -----------------------------
cargarIzquierda();
cargarDerecha();
