import { useState } from "react";
import "./App.css";

function App() {
  const [mazo, setMazo] = useState([]);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoCrupier, setManoCrupier] = useState([]);
  const [turno, setTurno] = useState("ninguno");
  const [marcadorJugador, setMarcadorJugador] = useState(0);
  const [marcadorCrupier, setMarcadorCrupier] = useState(0);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);

  function nuevaPartida() {}
  function dameCarta() {}
  function mePlanto() {}
  function turnoCrupier() {}
  function determinarGanador() {}
  return (
    <>
      <Marcador />
      <Crupier mano={manoCrupier} />
      <Jugador mano={manoJugador} />
    </>
  );
}

export default App;
