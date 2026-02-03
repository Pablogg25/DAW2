import { useEffect, useState } from "react";
import negocio from "../core/negocio.js";
function UsersPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function cargar() {
      const nuevosUsuarios = await negocio.obtenerUsuarios();
      console.log(nuevosUsuarios);
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

        {usuarios.map((u) => (
          <div key={u.id} className="tabla-row">
            <div>{u.username}</div>
          </div>
        ))}
      </div>
    </>
  );
}
export default UsersPage;
