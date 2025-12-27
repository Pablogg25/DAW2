// utils.js

export function crearPaginador(
  paginador,
  filtrados,
  itemsPorPagina,
  paginaActual,
  callback
) {
  paginador.innerHTML = "";

  if (itemsPorPagina === "all") return;

  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const div = document.createElement("div");
    div.classList.add("pagina");
    if (i === paginaActual) div.classList.add("activa");

    div.textContent = i;

    div.addEventListener("click", () => callback(i));

    paginador.appendChild(div);
  }
}

export function mostrarDatos(filtrados, contenedor, pintarItem) {
  contenedor.innerHTML = "";
  filtrados.forEach((item) => pintarItem(item, contenedor));
}
