function Marcador({ marcadorJugador, marcadorCrupier, nuevaPartida }) {
  return (
    <>
      <div className="marcadorJugador">Jugador: {marcadorJugador}</div>
      <div className="marcadorCrupier">Banca: {marcadorCrupier}</div>
      <button onClick={() => nuevaPartida()}>Iniciar Partida</button>
    </>
  );
}
export default Marcador;
