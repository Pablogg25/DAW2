import "./Tablero.css";
import { useState } from "react";
import Celda from "../Celda/Celda.jsx";
function Tablero() {
  let simbolo = "";
  let contenido;
  let turnoActual = 1;
  let ganador = null;
  let reiniciar;
  const maximo = 9;
  let contador = 0;
  let info = "";

  const [siguiente, setSiguiente] = useState(true);
  const [celdas, setCeldas] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  function pulsarCasilla(posicion) {
    if (calcularGanador(celdas) || celdas[posicion]) {
      return;
    }
    const siguienteCelda = celdas.slice();
    if (siguiente) {
      siguienteCelda[posicion] = "X";
    } else {
      siguienteCelda[posicion] = "O";
    }
    setCeldas(siguienteCelda);
    setSiguiente(!siguiente);
  }

  const winner = calcularGanador(celdas);
  if (winner) {
    info = "Ganador " + winner;
  } else {
    info = "Siguiente jugador: " + (siguiente ? "X" : "O");
  }
  return (
    <>
      <div id="info">{info}</div>
      <button>Comenzar</button>

      <div className="fila">
        <Celda simbolo={celdas[0]} funcion={() => pulsarCasilla(0)} />
        <Celda simbolo={celdas[1]} funcion={() => pulsarCasilla(1)} />
        <Celda simbolo={celdas[2]} funcion={() => pulsarCasilla(2)} />
      </div>

      <div className="fila">
        <Celda simbolo={celdas[3]} funcion={() => pulsarCasilla(3)} />
        <Celda simbolo={celdas[4]} funcion={() => pulsarCasilla(4)} />
        <Celda simbolo={celdas[5]} funcion={() => pulsarCasilla(5)} />
      </div>

      <div className="fila">
        <Celda simbolo={celdas[6]} funcion={() => pulsarCasilla(6)} />
        <Celda simbolo={celdas[7]} funcion={() => pulsarCasilla(7)} />
        <Celda simbolo={celdas[8]} funcion={() => pulsarCasilla(8)} />
      </div>
    </>
  );
}

export default Tablero;
function calcularGanador(celdas) {
  const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lineas.length; i++) {
    const [a, b, c] = lineas[i];
    if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) {
      return celdas[a];
    }
  }
  return null;
}
