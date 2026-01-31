import { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import API from "../core/API.js";
import { useNavigate } from "react-router-dom";

function PropsCochePage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [coche, setCoche] = useState(null);
  const navigate = useNavigate();

  const modo = params.get("modo"); // "ver" o "editar"
  const esEditable = modo === "editar";

  useEffect(() => {
    async function cargar() {
      const datos = await API.obtenerCoche(id);
      setCoche(datos);
    }
    cargar();
  }, [id]);

  if (!coche) return <p>Cargando...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    /* const formData = new FormData(e.target); */
    enviarDatos();
  };

  const enviarDatos = async () => {
    try {
      console.log(coche);
      await API.actualizarCoche(coche, coche.id);
      navigate("/mantenimiento");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    /* Target es de tipo input, el nombre y el valor están disponibles */
    const { name, value } = e.target;
    let actualizado = { ...coche, [name]: value };
    setCoche(actualizado);
  };

  function actualizar() {}

  return (
    <div className="coche-detalle">
      <h2>Detalles del Coche</h2>

      <div className="coche-info-form">
        <div className="info-row">
          <input type="text" value={id} hidden />
          <label className="label">Marca:</label>
          <input
            type="text"
            name="marca"
            defaultValue={coche.marca}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>

        <div className="info-row">
          <label className="label">Modelo:</label>
          <input
            type="text"
            name="modelo"
            defaultValue={coche.modelo}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>

        <div className="info-row">
          <label className="label">Año:</label>
          <input
            type="number"
            name="anno"
            defaultValue={coche.anno}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>

        <div className="info-row">
          <label className="label">Kilómetros:</label>
          <input
            type="number"
            name="km"
            defaultValue={coche.km}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>

        <div className="info-row">
          <label className="label">Precio:</label>
          <input
            type="number"
            name="precio"
            defaultValue={coche.precio}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>

        <div className="info-row">
          <label className="label">Estado:</label>
          <input
            type="text"
            name="estado"
            defaultValue={coche.estado}
            readOnly={!esEditable}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="acciones-detalle">
        <button
          className="btn-volver"
          onClick={() => navigate(`/mantenimiento`)}
        >
          Volver
        </button>

        <button className="btn-guardar" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

export default PropsCochePage;
