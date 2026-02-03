import { useEffect, useState } from "react";
import negocio from "../core/negocio";
import "./PacientesPage.css";
import { useNavigate } from "react-router-dom";

function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(5);

  useEffect(() => {
    async function cargar() {
      // 1. Construir query para TOTAL
      const queryTotal = filtro ? `filtro=${filtro}` : "";
      const todos = await negocio.obtenerPacientes(queryTotal);
      setTotal(todos.length);

      // 2. Si quiere TODOS → no paginar
      if (limite === "todos") {
        setPacientes(todos);
        return;
      }

      // 3. Construir query para página actual
      const inicio = pagina * limite;

      let query = `incio=${inicio}&limite=${limite}`;
      if (filtro) query += `&filtro=${filtro}`;

      const lista = await negocio.obtenerPacientes(query);
      // console.log(query);
      setPacientes(lista);
    }

    cargar();
  }, [filtro, pagina, limite]);

  async function eliminar(id) {
    await negocio.eliminarPaciente(id);

    // Recargar página actual
    const inicio = pagina * limite;
    let query = `offset=${inicio}&limit=${limite}`;
    if (filtro) query += `&filtro=${filtro}`;

    const lista = await negocio.obtenerPacientes(query);
    setPacientes(lista);
  }

  const paginasTotales = limite === "todos" ? 1 : Math.ceil(total / limite);

  return (
    <>
      <h2>Lista de Pacientes</h2>

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

      <button onClick={() => navigate("/paciente/0")}>Crear Paciente</button>
      <br />
      <div className="tabla">
        {pacientes.map((p) => (
          <div key={p.id} className="paciente">
            <p className="props">{p.nombre}</p>
            <p className="props">{p.dni}</p>
            <p className="props">{p.email}</p>
            <p className="props">{p.seguroMedico}</p>
            <p className="props">{p.telefono}</p>

            <button onClick={() => eliminar(p.id)}>Borrar</button>

            <button onClick={() => navigate(`/paciente/${p.id}`)}>Ver</button>
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

export default PacientesPage;
