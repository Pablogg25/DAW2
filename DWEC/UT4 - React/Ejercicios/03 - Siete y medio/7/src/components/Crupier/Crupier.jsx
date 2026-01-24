import Carta from "../Carta/Carta.jsx";
import { recuperarCarta } from "../../core/baraja";
function Crupier({ manoCrupier }) {
  function listarCartas(cartas) {
    let lista = [];
    if (cartas !== undefined) {
      cartas.forEach((id) => {
        lista.push(recuperarCarta(id));
      });

      return lista;
    }
  }
  function pintarCartas(manoCrupier) {
    let lista = listarCartas(manoCrupier);
    console.log(manoCrupier);
    if (lista !== undefined) {
      lista.forEach((c) => <Carta numero={c.numero} palo={c.palo} />);
    }
  }
  return (
    <>
      <div>{pintarCartas(manoCrupier)}</div>
    </>
  );
}
export default Crupier;
