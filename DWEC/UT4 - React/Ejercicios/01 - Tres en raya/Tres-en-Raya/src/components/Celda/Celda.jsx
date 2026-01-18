import "./Celda.css";
import { useState } from "react";

function Celda({ simbolo, funcion }) {
  return (
    <>
      <div className="casilla" onClick={funcion}>
        {simbolo}
      </div>
    </>
  );
}
export default Celda;
