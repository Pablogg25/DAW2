import "./Padre.css";
import { useState } from "react";
import Hijo from "../Hijo/Hijo.jsx";
import { cargaTareas, guardarTareas } from "../../core/tareas.js";
function Padre() {
  // Ultimo ID
  const ultimoId = Math.max(...tareas.map((t) => t.id), 0);
  // Estado ID
  const [id, setId] = useState(1);
  // Estado Input
  const [input, setInput] = useState("");
  // Estado Tareas
  const [tareas, setTareas] = useState([]);
  // Estado Filtros
  const [filtro, setFiltro] = useState("todas");

  /**
   * Parte de usar el UseEffect() Provisional
   */

  /*useEffect(() => {
    async function cargar() {
      const datos = await cargaTareas();
      setTareas(datos);
    }
    cargar();
  }, []);*/

  /*
   * Funcion que comprueba que el campo input no esta vacio y si no esta
   * me crea una tarea con el nombre que hemos puesto en el input un id
   * autoincremental y el estado por defecto "abierto"
   */
  function crearTarea(input, id) {
    if (!input) {
      alert("Rellena la tarea");
      return;
    }

    const nuevaTarea = {
      id,
      nombre: input,
      estado: "abierto",
    };

    setTareas([...tareas, nuevaTarea]);
    setId(id + 1);
    setInput("");
  }

  /*
   * Funcion que elimina la tarea filtrando la lista de tareas excluyendo
   * la que tiene la id que le pasamos por parametos (Con confirmacion)
   */
  function eliminarTarea(id) {
    if (window.confirm("¿Desea eliminar la tarea?")) {
      setTareas(tareas.filter((t) => t.id !== id));
    }
  }

  /*
   * Funcion que cambia el estado de la tarea de la ID que le pasamos
   */
  function cambiarEstado(id) {
    setTareas(
      tareas.map((t) =>
        t.id === id
          ? { ...t, estado: t.estado === "abierto" ? "cerrado" : "abierto" }
          : t,
      ),
    );
  }

  // Filtrado dinámico
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "abiertas") return t.estado === "abierto";
    if (filtro === "cerradas") return t.estado === "cerrado";
    return true; // todas
  });

  return (
    <div className="contenedor-tareas">
      <label>Nombre de la Tarea:</label>
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => crearTarea(input, id)}>Crear</button>

      <button onClick={() => setFiltro("todas")}>Todas</button>
      <button onClick={() => setFiltro("abiertas")}>Abiertas</button>
      <button onClick={() => setFiltro("cerradas")}>Cerradas</button>

      {tareasFiltradas.map((t) => (
        <Hijo
          key={t.id}
          id={t.id}
          nombre={t.nombre}
          estado={t.estado}
          onEliminar={() => eliminarTarea(t.id)}
          onCambiarEstado={() => cambiarEstado(t.id)}
        />
      ))}
    </div>
  );
}

export default Padre;
