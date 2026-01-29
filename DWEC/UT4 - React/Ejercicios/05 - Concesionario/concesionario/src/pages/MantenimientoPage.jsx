import { useEffect, useState } from "react";
import Negocio from "../core/negocio.js";
import "./MantenimientoPage.css";

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

      <div className="lista-coches">
        <div className="lista-header">
          <div>Marca</div>
          <div>Modelo</div>
          <div>Año</div>
          <div>Kilómetros</div>
          <div>Precio</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>

        {coches.map((coche) => (
          <div key={coche.id} className="lista-row">
            <div>{coche.marca}</div>
            <div>{coche.modelo}</div>
            <div>{coche.anno}</div>
            <div>{coche.km}</div>
            <div>{coche.precio} €</div>
            <div>{coche.estado}</div>
            <div className="acciones">
              <button
                onClick={async () => {
                  await Negocio.eliminarCoche(coche.id);
                  const lista = await Negocio.obtenerCoches(
                    filtro,
                    pagina * limite,
                    limite,
                  );
                  setCoches(lista);
                }}
              >
                Eliminar
              </button>
              <button>Editar</button>
              <button>Ver</button>
            </div>
          </div>
        ))}
      </div>

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
