export function crearPaginador(
  paginador,
  filtrados,
  itemsPorPagina,
  paginaActual
) {
  paginador.innerHTML = "";

  // if (itemsPorPagina === "all") return;

  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const span = document.createElement("span");
    span.classList.add("pagina");
    if (i === paginaActual) span.classList.add("activa");

    span.textContent = i;
    span.addEventListener("click", () => {
      paginaActual = i;
      actualizar();
    });
    paginador.appendChild(span);
  }
}

export function mostrarDatos(filtrados, contenedor, pintarItem) {
  contenedor.innerHTML = "";
  filtrados.forEach((item) => {
    pintarItem(item);
  });
}

function actualizar() {
  let filtrados = datos.filter((u) =>
    u.title.toLowerCase().includes(filtro.value.toLowerCase())
  );

  if (itemsPorPagina !== "all") {
    // alert(filtrados.length);
    const inicio = (paginaActual - 1) * Number(itemsPorPagina);
    const fin = inicio + Number(itemsPorPagina);
    pagina = filtrados.slice(inicio, fin);
  } else {
    // alert(filtrados.length);
    const inicio2 = 1;
    const fin2 = filtrados.length;
    pagina = filtrados.slice(inicio2, fin2);
  }

  mostrarDatos(pagina, contenedor);

  crearPaginador(paginador, filtrados, itemsPorPagina, paginaActual);
}
