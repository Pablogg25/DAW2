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
  const [jugadorPlantado, setJugadorPlantado] = useState(false);
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
    setManoJugador([nuevoMazo[0]]);
    setManoCrupier([nuevoMazo[1]]);

    setGanador("");
    setPartidaEnCurso(true);
    setTurno("jugador");
  }

  function dameCarta() {
    if (turno !== "jugador") return;

    const carta = mazo[0];
    setMazo(mazo.slice(1));

    const nuevaMano = [...manoJugador, carta];
    setManoJugador(nuevaMano);
  }

  function mePlanto() {
    setJugadorPlantado(true);
    setTurno("crupier");
  }

  function turnoCrupier() {
    let mano = [...manoCrupier];
    let mazoTemp = [...mazo];

    while (
      sumarCartas(mano) < sumarCartas(manoJugador) &&
      sumarCartas(mano) <= 7.5
    ) {
      const carta = mazoTemp[0];
      mazoTemp = mazoTemp.slice(1);
      mano.push(carta);
    }

    setManoCrupier(mano);
    setMazo(mazoTemp);
    setTurno("fin");
  }

  function determinarGanador() {
    const sumaJ = sumarCartas(manoJugador);
    const sumaC = sumarCartas(manoCrupier);

    if (sumaJ > sumaC) {
      setMarcadorJugador((prev) => prev + 1);
      setGanador("jugador");
    } else if (sumaC > sumaJ) {
      setMarcadorCrupier((prev) => prev + 1);
      setGanador("crupier");
    } else {
      setGanador("empate");
    }

    setPartidaEnCurso(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!partidaEnCurso) return;

    const sumaJ = sumarCartas(manoJugador);
    const sumaC = sumarCartas(manoCrupier);

    // 1. Jugador se pasa
    if (turno === "jugador" && sumaJ > 7.5) {
      setMarcadorCrupier((prev) => prev + 1);
      setGanador("crupier");
      setTurno("fin");
      setPartidaEnCurso(false);
      return;
    }

    // 2. Si el jugador NO se ha plantado, no hacemos nada más
    if (turno === "jugador" && !jugadorPlantado) {
      return;
    }

    // 3. Turno del crupier SOLO si el jugador se plantó
    if (turno === "crupier" && jugadorPlantado) {
      turnoCrupier();
      return;
    }

    // 4. Crupier se pasa
    if (turno === "fin" && sumaC > 7.5) {
      setMarcadorJugador((prev) => prev + 1);
      setGanador("jugador");
      setPartidaEnCurso(false);
      return;
    }

    // 5. Fin normal → comparar
    if (turno === "fin") {
      determinarGanador();
      return;
    }
  }, [manoJugador, manoCrupier, turno, partidaEnCurso, jugadorPlantado]);

  return (
    <>
      <Marcador
        marcadorCrupier={marcadorCrupier}
        marcadorJugador={marcadorJugador}
        nuevaPartida={nuevaPartida}
      />

      <Crupier mano={manoCrupier} />
      <Jugador
        mano={manoJugador}
        turno={turno}
        dameCarta={dameCarta}
        mePlanto={mePlanto}
      />
    </>
  );
}

export default App;
