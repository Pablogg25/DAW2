function Marcador({ marcadorJugador, marcadorCrupier, funcion2, funcion }) {
  return (
    <>
      <div className="marcadorJugador">Jugador: {marcadorJugador}</div>
      <div className="marcadorCrupier">Banca: {marcadorCrupier}</div>
      <button onClick={() => funcion2()}>Iniciar Partida</button>
    </>
  );
}
export default Marcador;
