// import { useState } from "react";
import "./Hijo.css";

function Hijo() {
  /*
   * Funcion de eliminar tarea de la lista que esta
   * en localStorage
   */
  function eliminarTarea() {
    if (window.confirm("¿Desea eliminar la tarea?")) {
      //   localStorage.removeItem(tarea);
    }
  }
  return (
    <>
      <button onClick={eliminarTarea}>Eliminar</button>
    </>
  );
}
export default Hijo;
