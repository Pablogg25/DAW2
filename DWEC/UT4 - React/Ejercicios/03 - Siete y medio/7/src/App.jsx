// import Carta from "./components/Carta/Carta.jsx";
import Crupier from "./components/Crupier/Crupier.jsx";
import Jugador from "./components/Jugador/Jugador.jsx";
import Marcador from "./components/Marcador/Marcador.jsx";
import {
  baraja,
  barajarCartas,
  recuperarCarta,
  sumarCartas,
} from "./core/baraja.js";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [ganador, setGanador] = useState("");
  const [mazo, setMazo] = useState([]);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoCrupier, setManoCrupier] = useState([]);
  const [turno, setTurno] = useState("ninguno");
  const [marcadorJugador, setMarcadorJugador] = useState(0);
  const [marcadorCrupier, setMarcadorCrupier] = useState(0);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);

  function nuevaPartida() {
    const nuevoMazo = barajarCartas();
    setMazo(nuevoMazo.slice(2));
    setPartidaEnCurso(true);
    setManoJugador([nuevoMazo[0]]);
    setManoCrupier([nuevoMazo[1]]);
    comprobarPuntos();
    if (ganador === "") {
      setTurno("jugador");
    }
  }

  function dameCarta() {
    if (turno !== "ninguno") {
      const carta = mazo[0];
      setMazo(mazo.slice(1));

      const nuevaMano = [...manoJugador, carta];
      setManoJugador(nuevaMano);
    }
  }

  function comprobarPuntos() {
    let sumaJugador = sumarCartas(manoJugador);
    let sumaCrupier = sumarCartas(manoCrupier);

    if (sumaCrupier > 7.5) {
      if (sumaJugador > 7.5) {
        // Desabilitar Botones
        setTurno("ninguno");
        setPartidaEnCurso(false);
        if (sumaJugador < sumaCrupier) {
          setGanador("jugador");
        } else if (sumaCrupier < sumaJugador) {
          setGanador("crupier");
        } else {
          setGanador("empate");
        }
      } else {
        setTurno("ninguno");
        setPartidaEnCurso(false);
        setMarcadorJugador(marcadorJugador + 1);
      }
    } else {
      if (sumaJugador > 7.5) {
        setMarcadorCrupier(marcadorCrupier + 1);
        setTurno("ninguno");
        setPartidaEnCurso(false);
      } else {
        setTurno("crupier");
      }
    }
  }

  function mePlanto() {
    setTurno("crupier");
    // Desactivar botones
  }
  function turnoCrupier() {}
  function determinarGanador() {}
  useEffect(() => {
    if (turno === "crupier") {
      turnoCrupier();
    }
  }, [turno]);

  function deshabilitarBotones() {}
  function habilitarBtnPartida() {}
  return (
    <>
      <Marcador
        marcadorCrupier={marcadorCrupier}
        marcadorJugador={marcadorJugador}
        funcion={() => habilitarBtnPartida()}
        funcion2={() => nuevaPartida()}
      />
      <Crupier mano={manoCrupier} />
      <Jugador mano={manoJugador} />
      <p>Hola</p>
    </>
  );
}

export default App;
