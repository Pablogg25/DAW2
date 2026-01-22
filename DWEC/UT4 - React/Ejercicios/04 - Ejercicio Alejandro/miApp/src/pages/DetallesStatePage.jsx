import { useLocation, useNavigate } from "react-router-dom";
import negocio from "../core/Negocio.js";
import { useEffect, useState } from "react";
function DetallesStatePage() {
  //const { id } = useParams();
  const location = useLocation();
  const id = location.state?.id;
  const [modulo, setModulo] = useState();
  const navegar = useNavigate();
  useEffect(() => {
    cargarDatos(id);
  }, [id]);
  const cargarDatos = async (id) => {
    try {
      let respuesta = await negocio.obtenerModulo(id);
      setModulo(respuesta);
      console.log("id " + id + " " + respuesta);
      console.log(respuesta);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    enviarDatos();
  };

  const enviarDatos = async () => {
    try {
      await negocio.actualizarModulo(modulo);
      navegar("/lista");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    /* Target es de tipo input, el nombre y el valor están disponibles */
    const { name, value } = e.target;
    let actualizado = { ...modulo, [name]: value };
    setModulo(actualizado);
  };
  return (
    <>
      <h1>Página de detalles con STATE</h1>
      {modulo && (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" id="id" value={modulo.id} />
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={modulo.nombre}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="horas">Horas:</label>
          <input
            type="number"
            name="horas"
            id="horas"
            value={modulo.horas}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Enviar</button>
        </form>
      )}
    </>
  );
}
export default DetallesStatePage;
