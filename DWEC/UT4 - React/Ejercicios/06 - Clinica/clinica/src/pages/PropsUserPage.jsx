import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import negocio from "../core/negocio.js";

function PropsUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    tipo: "",
    id: null,
  });

  useEffect(() => {
    // Si id = 0 → es creación → no cargamos nada
    if (id === "0") return;

    async function cargarUsuario() {
      const datos = await negocio.obtenerUsuario(id);
      setUsuario(datos);
    }

    cargarUsuario();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  const esNuevo = id === "0";

  return (
    <>
      <h2>
        {esNuevo
          ? "Crear nuevo usuario"
          : `Propiedades del Usuario: ${usuario.username}`}
      </h2>

      <label>Username: </label>
      <input type="text" value={usuario.username} onChange={handleChange} />
      <label>Password: </label>
      <input type="text" value={usuario.password} onChange={handleChange} />
      <label>Tipo: </label>
      <input type="text" value={usuario.tipo} onChange={handleChange} />
      <button onClick={() => navigate("/usuarios")}>Volver</button>
    </>
  );
}
export default PropsUserPage;
