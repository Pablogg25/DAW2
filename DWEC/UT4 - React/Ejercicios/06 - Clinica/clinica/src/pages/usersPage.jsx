import { useEffect, useState } from "react";
import negocio from "../core/negocio.js";
import { useNavigate } from "react-router-dom";
function UsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function cargar() {
      const nuevosUsuarios = await negocio.obtenerUsuarios();
      // console.log(nuevosUsuarios);
      setUsuarios(nuevosUsuarios);
    }
    cargar();
  }, []);

  return (
    <>
      <h2>Listado de Usuarios</h2>

      <div className="tabla">
        <div className="tabla-header">
          <div>Nombre de usuario</div>
        </div>
        <button onClick={() => navigate("/usuarios/0")}>Crear Usuario</button>
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
