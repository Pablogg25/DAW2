import { useEffect, useState } from "react";
import API from "../core/API.js";

function ErrorPage() {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    async function cargar() {
      const lista = await API.obtenerCoches();
      setCoches(lista);
      return lista;
    }
    cargar();
    console.log(cargar());
  }, []);

  return (
    <>
      <h2>Inicio</h2>
      <div className="lista-coches">
        {coches.map((coche) => (
          <div key={coche.id} className="coche-card">
            <h4>
              {coche.marca} {coche.modelo}
            </h4>
            <p>Año: {coche.anno}</p>
            <p>Precio: {coche.precio}</p>
            <p>Estado: {coche.estado}</p>
          </div>
        ))}
      </div>
      <div>
        <label></label>
      </div>
    </>
  );
}

export default ErrorPage;
