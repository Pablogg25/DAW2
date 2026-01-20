import "./Hijo.css";

function Hijo({ id, nombre, estado, onEliminar, onCambiarEstado }) {
  return (
    <>
      <div className={`tarea ${estado === "cerrado" ? "cerrada" : ""}`}>
        <label>Nombre:</label>
        <input type="text" value={nombre} readOnly />
        <br />
        <label>Estado</label>
        <input type="text" value={estado} readOnly />
        <button onClick={() => onCambiarEstado(id)}>Cambiar estado</button>
        <button onClick={() => onEliminar(id)}>Eliminar</button>
      </div>
    </>
  );
}
export default Hijo;
