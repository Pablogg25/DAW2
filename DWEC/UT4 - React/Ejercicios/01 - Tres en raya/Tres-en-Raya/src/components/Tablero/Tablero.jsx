import "./Tablero.css";
function Tablero() {
  return (
    <>
      <div id="info"></div>
      <button>Comenzar</button>

      <div className="fila">
        <div className="casilla"></div>
        <div className="casilla"></div>
        <div className="casilla"></div>
      </div>

      <div className="fila">
        <div className="casilla"></div>
        <div className="casilla"></div>
        <div className="casilla"></div>
      </div>

      <div className="fila">
        <div className="casilla"></div>
        <div className="casilla"></div>
        <div className="casilla"></div>
      </div>
    </>
  );
}

export default Tablero;
