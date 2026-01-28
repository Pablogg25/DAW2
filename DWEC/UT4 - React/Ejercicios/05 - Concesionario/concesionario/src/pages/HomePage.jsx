import { useEffect, useState } from "react";
import Negocio from "../core/negocio";
import "./HomePage.css";

function HomePage() {
  const [coches, setCoches] = useState([]);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    async function cargar() {
      const lista = await Negocio.obtenerCoches();
      setCoches(lista);

      const aleatorios = [...lista].sort(() => Math.random() - 0.5).slice(0, 3);
      setDestacados(aleatorios);
    }
    cargar();
  }, []);

  return (
    <>
      <h2>Inicio</h2>
      <div className="lista-coches">
        {destacados.map((coche) => (
          <div key={coche.id} className="coche-card">
            <h4>
              {coche.marca} {coche.modelo}
            </h4>
            <p>Año: {coche.anoo}</p>
            <p>Precio: {coche.precio}</p>
            <p>Estado: {coche.estado}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default HomePage;
