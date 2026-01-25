import { useEffect, useState } from "react";
import negocio from "../core/Negocio.js";
import ListaLinea from "../components/ListaLinea.jsx";

function ListaPage() {
  const [modulos, setModulos] = useState([]);

  const getModulos = async () => {
    try {
      const respuesta = await negocio.obtenerModulos();
      setModulos(respuesta);
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getModulos();
  }, []);

  return (
    <>
      <h1>Lista de módulos</h1>
      {modulos.map((cadaModulo) => {
        return <ListaLinea key={cadaModulo.id} modulo={cadaModulo} />;
      })}
    </>
  );
}
export default ListaPage;
