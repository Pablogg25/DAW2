import Carta from "../Carta/Carta.jsx";
import { recuperarCarta } from "../../core/baraja";

function Crupier({ mano }) {
  if (!mano || mano.length === 0) {
    return <div className="crupier">Sin cartas</div>;
  }

  const cartas = mano.map((id) => recuperarCarta(id));

  return (
    <>
      <p>Mano Crupier:</p>
      <div className="crupier">
        {cartas.map((c) => (
          <Carta key={c.id} numero={c.numero} palo={c.palo} />
        ))}
      </div>
    </>
  );
}

export default Crupier;
