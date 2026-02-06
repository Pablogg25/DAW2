import { useContext, useEffect, useState } from "react";
import { SeguridadContext } from "../context/SeguridadProvider";
import Carrusel from "../components/Carrusel";
import negocio from "../core/negocio.js";

function HomePage() {
  const { datos } = useContext(SeguridadContext);
  console.log("DATOS:", datos);

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    async function cargarPacientes() {
      const lista = await negocio.obtenerPacientes();
      console.log("Lista", lista);
      setPacientes(lista.slice(0, 10));
    }
    cargarPacientes();
  }, []);

  return (
    <>
      <p>Home Page</p>
      <Carrusel pacientes={pacientes} />
    </>
  );
}

export default HomePage;
