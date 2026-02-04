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

      let query = `inicio=${inicio}&limite=${limite}`;
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
    let query = `inicio=${inicio}&limite=${limite}`;
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

      <div className="tabla">
        <div className="tabla-header">
          <div>Nombre</div>
          <div>DNI</div>
          <div>Email</div>
          <div>Seguro Médico</div>
          <div>Teléfono</div>
          <div>Acciones</div>
        </div>

        {pacientes.map((p) => (
          <div key={p.id} className="tabla-row">
            <div>{p.nombre}</div>
            <div>{p.dni}</div>
            <div>{p.email}</div>
            <div>{p.seguroMedico}</div>
            <div>{p.telefono}</div>

            <div>
              <button className="danger" onClick={() => eliminar(p.id)}>
                Borrar
              </button>
              <button onClick={() => navigate(`/paciente/${p.id}`)}>Ver</button>
            </div>
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

export default PacientesPage;
