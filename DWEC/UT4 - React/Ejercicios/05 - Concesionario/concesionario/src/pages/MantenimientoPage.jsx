import { useEffect, useState } from "react";
import Negocio from "../core/negocio.js";

function MantenimientoPage() {
  const [coches, setCoches] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(5);

  useEffect(() => {
    async function cargar() {
      const todos = await Negocio.obtenerCoches(filtro);
      setTotal(todos.length);

      if (limite === "todos") {
        setCoches(todos);
        return;
      }

      const lista = await Negocio.obtenerCoches(
        filtro,
        pagina * limite,
        limite,
      );

      setCoches(lista);
    }

    cargar();
  }, [filtro, pagina, limite]);

  const paginasTotales = limite === "todos" ? 1 : Math.ceil(total / limite);

  return (
    <div className="mantenimiento">
      <h2>Mantenimiento de Coches</h2>

      <input
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={(e) => {
          setPagina(0);
          setFiltro(e.target.value);
        }}
      />

      <select
        value={limite}
        onChange={(e) => {
          setPagina(0);
          setLimite(
            e.target.value === "todos" ? "todos" : Number(e.target.value),
          );
        }}
      >
        <option value={5}>5 por página</option>
        <option value={10}>10 por página</option>
        <option value="todos">Todos</option>
      </select>

      <table className="tabla-coches">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Kilómetros</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {coches.map((coche) => (
            <tr key={coche.id}>
              <td>{coche.marca}</td>
              <td>{coche.modelo}</td>
              <td>{coche.anno}</td>
              <td>{coche.km}</td>
              <td>{coche.precio} €</td>
              <td>{coche.estado}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
                <button>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {limite !== "todos" && (
        <div className="paginador">
          <button
            disabled={pagina === 0}
            onClick={() => setPagina((p) => p - 1)}
          >
            Anterior
          </button>

          <span>
            Página {pagina + 1} de {paginasTotales}
          </span>

          <button
            disabled={pagina + 1 >= paginasTotales}
            onClick={() => setPagina((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default MantenimientoPage;
