// const datos = Array.from({ length: 50 }, (_, i) => Elemento ${i + 1});
const itemsPorPagina = 5;
let paginaActual = 1;

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");

function mostrarDatos() {
  contenedor.innerHTML = "";

  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const datosPagina = datos.slice(inicio, fin);

  datosPagina.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.textContent = item;
    contenedor.appendChild(div);
  });
}

function crearPaginador() {
  paginador.innerHTML = "";
  const totalPaginas = Math.ceil(datos.length / itemsPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const div = document.createElement("div");
    div.classList.add("pagina");
    if (i === paginaActual) div.classList.add("activa");

    div.textContent = i;
    div.addEventListener("click", () => {
      paginaActual = i;
      mostrarDatos();
      crearPaginador();
    });

    paginador.appendChild(div);
  }
}

mostrarDatos();
