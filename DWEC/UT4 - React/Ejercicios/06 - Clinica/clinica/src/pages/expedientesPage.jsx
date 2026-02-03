import { useEffect, useState } from "react";
import "./ExpedientesPage.css";
import negocio from "../core/negocio.js";
import { useNavigate } from "react-router-dom";

function ExpedientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      // 1. Query para total
      const queryTotal = filtro ? `filtro=${filtro}` : "";
      const todos = await negocio.obtenerPacientes(queryTotal);
      setTotal(todos.length);

      // 2. Si quiere TODOS
      if (limite === "todos") {
        setPacientes(todos);
        return;
      }

      // 3. Query correcta para paginación
      const inicio = pagina * limite;

      let query = `inicio=${inicio}&limite=${limite}`;
      if (filtro) query += `&filtro=${filtro}`;

      const lista = await negocio.obtenerPacientes(query);
      setPacientes(lista);
    }

    cargar();
  }, [filtro, pagina, limite]);

  const paginasTotales = limite === "todos" ? 1 : Math.ceil(total / limite);
  return (
    <>
      <p>Lista de Expedientes</p>
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
      <br />
      <br />
      <div className="tabla">
        {pacientes.map((p) => (
          <div
            key={p.id}
            className="paciente"
            onClick={() => navigate(`/expediente/${p.id}`)}
          >
            <p className="props">{p.nombre} </p>
            <p className="props">{p.seguroMedico}</p>
            <p className="props">{p.telefono}</p>
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
    </>
  );
}
export default ExpedientesPage;
