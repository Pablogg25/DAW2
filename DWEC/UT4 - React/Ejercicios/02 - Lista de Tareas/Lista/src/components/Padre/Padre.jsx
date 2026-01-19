import "./Padre.css";
import { useState } from "react";
import Hijo from "../Hijo/Hijo.jsx";

function Padre() {
  // Estado ID
  const [id, setId] = useState(1);
  // Estado Input
  const [input, setInput] = useState("");
  // Estado Lista Tareas
  const [tareas, setTareas] = useState([]);
  // Estado filtro Actual
  const [filtro, setFiltro] = useState("abiertas");
  /*
   * Buscar Tareas todas por defecto y si hay algo en
   * el input que busque por el valor del input
   */
  function cargarTareas() {}

  /*
   *Funcion para crear una tarea con lo que tengo en el input
   */
  function crearTarea(input, id) {
    let nuevaTarea = {
      id: id,
      nombre: input,
      estado: "abierto",
    };
    setTareas([...tareas, nuevaTarea]);
    setId((id) => id + 1);
  }
  /*
   * Probar actualización Input
   */
  // console.log(input);
  console.log(tareas);
  return (
    <>
      <label>Nombre de la Tarea:</label>
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => crearTarea(input, id)}>Crear</button>
      <button>Añadir</button>

      <button>Todas</button>
      <button>Abiertas</button>
      <button>Cerradas</button>

      <Hijo />
    </>
  );
}
export default Padre;
