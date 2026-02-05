import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio.js";

function UsersPage() {
  const { datos } = useContext(SeguridadContext);

  // HOOKS ARRIBA
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      const nuevosUsuarios = await negocio.obtenerUsuarios();
      setUsuarios(nuevosUsuarios);
    }
    cargar();
  }, []);

  // SEGURIDAD
  if (!datos.tienePermisos || datos.tipo !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>Listado de Usuarios</h2>

      <button onClick={() => navigate("/usuarios/0")}>Crear Usuario</button>

      <div className="tabla">
        <div className="tabla-header">
          <div>Nombre de usuario</div>
        </div>

        {usuarios.map((u) => (
          <div
            key={u.id}
            className="tabla-row"
            onClick={() => navigate(`/usuarios/${u.id}`)}
          >
            <div>{u.username}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UsersPage;
