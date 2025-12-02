const alumnos = [
  {
    nombre: "Ana López",
    dni: "12345678A",
    curso: "2º Desarrollo Web",
    asignaturas: ["HTML", "CSS", "JavaScript", "React"],
    telefono: "600123456",
    email: "ana.lopez@example.com",
  },
  {
    nombre: "Carlos Martínez",
    dni: "23456789B",
    curso: "1º Administración de Sistemas",
    asignaturas: ["Linux", "Redes", "Hardware"],
    telefono: "650987654",
    email: "carlos.martinez@example.com",
  },
  {
    nombre: "Laura Sánchez",
    dni: "34567890C",
    curso: "3º Diseño Gráfico",
    asignaturas: ["Photoshop", "Illustrator", "UX Design"],
    telefono: "620111222",
    email: "laura.sanchez@example.com",
  },
  {
    nombre: "Mario Gómez",
    dni: "45678901D",
    curso: "1º Inteligencia Artificial",
    asignaturas: ["Python", "Machine Learning", "Data Science"],
    telefono: "670555444",
    email: "mario.gomez@example.com",
  },
];

/**
 * Estilos basicos
 */
const styles = document.createElement("style");

styles.textContent = `.resaltado { background-color: rgba(255,0,0,0.1); }
  .seleccionado { background-color: rgba(255,0,0,0.3); }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ccc; padding: 6px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 150px; }
  tr:hover td { white-space: normal; background-color: #f0f0f0; }
  .fichas { display: flex; flex-wrap: wrap; gap: 10px; }
  .ficha { border: 1px solid #999; padding: 10px; width: 200px; background: #fafafa; }
  .ficha:hover { background-color: #f0f0f0; }`;

document.head.appendChild(styles);

/**
 * Contenedor principal
 */
const app = document.createElement("div");
document.body.appendChild(app);

/**
 * Cabecera
 */
const header = document.createElement("div");
const botonTabla = document.createElement("button");
botonTabla.textContent = "Ver detalles";
const botonFichas = document.createElement("button");
botonFichas.textContent = "Ver Ficha";
header.appendChild(botonTabla);
header.appendChild(botonFichas);
app.appendChild(header);
const contenedor = document.createElement("div");
app.appendChild(contenedor);

let seleccionado = null;

/**
 * Funcion para limpiar la parte seleccionada para eliminar todo el tema
 * de estilo etc
 */
function LimpiarSeleccion() {
  if (seleccionado) seleccionado.classList.remove("seleccionado");
  seleccionado = null;
}

/**
 * Creamos tablas
 */
function crearTabla() {
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  ["Nombre", "Curso", "Teléfono", "Email"].forEach;
  (col) => {
    const th = document.createElement("th");
    th.textContent = col;
    tr.appendChild(th);
  };
  thead.appendChild(tr);
  tabla.appendChild(thead);
}
/**
 * Creamos Fichas
 */

/**
 * Funciones de los botones
 */
botonTabla.addEventListener("click", renderTabla);
botonFichas.addEventListener("click", renderFichas);
