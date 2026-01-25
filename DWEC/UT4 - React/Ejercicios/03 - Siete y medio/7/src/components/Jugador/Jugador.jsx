import Carta from "../Carta/Carta.jsx";
import { recuperarCarta } from "../../core/baraja";

function Jugador({ mano, turno, dameCarta, mePlanto }) {
  const cartas = mano.map((id) => recuperarCarta(id));

  return (
    <>
      <p>Mano Jugador:</p>
      <div className="jugador">
        {cartas.map((c) => (
          <Carta key={c.id} numero={c.numero} palo={c.palo} />
        ))}

        {turno === "jugador" && (
          <div className="acciones">
            <button onClick={dameCarta}>Dame carta</button>
            <button onClick={mePlanto}>Me planto</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Jugador;
