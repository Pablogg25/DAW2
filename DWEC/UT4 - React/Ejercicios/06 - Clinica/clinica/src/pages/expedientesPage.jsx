import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio.js";

function ExpedientesPage() {
  const { datos } = useContext(SeguridadContext);

  // HOOKS ARRIBA
  const [pacientes, setPacientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      const queryTotal = filtro ? `filtro=${filtro}` : "";
      const todos = await negocio.obtenerPacientes(queryTotal);
      setTotal(todos.length);

      if (limite === "todos") {
        setPacientes(todos);
        return;
      }

      const inicio = pagina * limite;

      let query = `inicio=${inicio}&limite=${limite}`;
      if (filtro) query += `&filtro=${filtro}`;

      const lista = await negocio.obtenerPacientes(query);
      setPacientes(lista);
    }

    cargar();
  }, [filtro, pagina, limite]);

  // SEGURIDAD DESPUÉS DE LOS HOOKS
  if (!datos.tienePermisos || !["medico", "admin"].includes(datos.tipo)) {
    return <Navigate to="/login" />;
  }

  const paginasTotales = limite === "todos" ? 1 : Math.ceil(total / limite);

  return (
    <>
      <h2>Lista de Expedientes</h2>

      <input
        type="text"
        placeholder="Buscador..."
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

      <div className="tabla">
        <div className="tabla-header">
          <div>Nombre</div>
          <div>Seguro Médico</div>
          <div>Teléfono</div>
        </div>

        {pacientes.map((p) => (
          <div
            key={p.id}
            className="tabla-row"
            onClick={() => navigate(`/expediente/${p.id}`)}
          >
            <div>{p.nombre}</div>
            <div>{p.seguroMedico}</div>
            <div>{p.telefono}</div>
          </div>
        ))}
      </div>

      {limite !== "todos" && (
        <div className="paginador">
          <button disabled={pagina === 0} onClick={() => setPagina(pagina - 1)}>
            Anterior
          </button>

          <span>
            Página {pagina + 1} de {paginasTotales}
          </span>

          <button
            disabled={pagina + 1 >= paginasTotales}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}

export default ExpedientesPage;
