import { useEffect, useState } from "react";
import API from "../core/API.js";
import "./MantenimientoPage.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SeguridadContext } from "../core/SeguridadProvider.jsx";
import { Navigate } from "react-router-dom";

function MantenimientoPage() {
  const { datos } = useContext(SeguridadContext);

  const [coches, setCoches] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      // 1. Obtener total filtrado
      const todos = await API.obtenerCoches(filtro);
      setTotal(todos.length);

      // 2. Si quiere TODOS → no paginar
      if (limite === "todos") {
        setCoches(todos);
        return;
      }

      // 3. Pedir SOLO la página actual a la API
      const inicio = pagina * limite;
      const query = `offset=${inicio}&limit=${limite}&${filtro}`;
      const lista = await API.obtenerCoches(query);

      setCoches(lista);
    }

    cargar();
  }, [filtro, pagina, limite]);

  if (!datos.tienePermisos) {
    return <Navigate to="/login" />;
  }

  const paginasTotales = limite === "todos" ? 1 : Math.ceil(total / limite);

  async function eliminar(id) {
    await API.eliminarCoche(id);

    const inicio = pagina * limite;
    const query = `offset=${inicio}&limit=${limite}&${filtro}`;
    const lista = await API.obtenerCoches(query);

    setCoches(lista);
  }

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
              <button onClick={() => eliminar(coche.id)}>Eliminar</button>
              <button
                onClick={() => navigate(`/props/${coche.id}?modo=editar`)}
              >
                Editar
              </button>

              <button onClick={() => navigate(`/props/${coche.id}?modo=ver`)}>
                Ver
              </button>
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
