import { useEffect, useState } from "react";
import Negocio from "../core/negocio";
import "./HomePage.css";
import API from "../core/API.js";

function HomePage() {
  const [coches, setCoches] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const filtroLimite = "offset=10&limit=10";
  useEffect(() => {
    async function cargar() {
      const lista = await API.obtenerCoches(filtroLimite);
      setCoches(lista);

      const aleatorios = [...lista]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);
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
