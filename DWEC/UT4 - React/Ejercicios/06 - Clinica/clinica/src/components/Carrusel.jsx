import { useState } from "react";
import FichaCarrusel from "./FichaCarrusel";

function Carrusel({ pacientes }) {
  const [indice, setIndice] = useState(0);
  const total = pacientes.length;

  function anterior() {
    if (indice === 0) {
      setIndice(total - 1);
    } else {
      setIndice(indice - 1);
    }
  }

  function siguiente() {
    if (indice === total - 1) {
      setIndice(0);
    } else {
      setIndice(indice + 1);
    }
  }

  if (total === 0) return <p>No hay pacientes</p>;

  const visibles = [
    pacientes[indice],
    pacientes[(indice + 1) % total],
    pacientes[(indice + 2) % total],
  ];

  return (
    <>
      <div className="carrusel">
        <button onClick={anterior}>Anterior</button>

        <div className="fichasCarrusel">
          {visibles.map((p, i) => (
            <FichaCarrusel key={i} paciente={p} />
          ))}
        </div>

        <button onClick={siguiente}>Siguiente</button>
      </div>
    </>
  );
}

export default Carrusel;
