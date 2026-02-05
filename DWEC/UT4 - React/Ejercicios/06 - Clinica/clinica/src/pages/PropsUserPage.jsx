import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio.js";

function PropsUserPage() {
  const { datos } = useContext(SeguridadContext);

  // HOOKS ARRIBA
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    tipo: "",
    id: null,
  });

  useEffect(() => {
    if (id === "0") return;

    async function cargarUsuario() {
      const datos = await negocio.obtenerUsuario(id);
      setUsuario(datos);
    }

    cargarUsuario();
  }, [id]);

  // SEGURIDAD
  if (!datos.tienePermisos || datos.tipo !== "admin") {
    return <Navigate to="/login" />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  const esNuevo = id === "0";

  async function guardar() {
    if (esNuevo) {
      await negocio.crearUsuario(usuario);
      alert("Usuario creado");
    } else {
      await negocio.actualizarUsuario(usuario);
      alert("Usuario actualizado");
    }
    navigate("/usuarios");
  }

  return (
    <>
      <h2>
        {esNuevo
          ? "Crear nuevo usuario"
          : `Propiedades del Usuario: ${usuario.username}`}
      </h2>

      <label>Username: </label>
      <input
        type="text"
        name="username"
        value={usuario.username}
        onChange={handleChange}
      />

      <label>Password: </label>
      <input
        type="text"
        name="password"
        value={usuario.password}
        onChange={handleChange}
      />

      <label>Tipo: </label>
      <input
        type="text"
        name="tipo"
        value={usuario.tipo}
        onChange={handleChange}
      />

      <button onClick={guardar}>Guardar</button>
      <button onClick={() => navigate("/usuarios")}>Volver</button>
    </>
  );
}

export default PropsUserPage;
