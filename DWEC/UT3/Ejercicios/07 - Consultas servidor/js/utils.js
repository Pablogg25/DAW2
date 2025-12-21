export function crearPaginador(
  paginador,
  filtrados,
  itemsPorPagina,
  paginaActual
) {}
export function mostrarDatos(filtrados, contenedor) {
  contenedor.innerHTML = "";
  filtrados.forEach((item) => {
    pintarItem(item);
  });
}
