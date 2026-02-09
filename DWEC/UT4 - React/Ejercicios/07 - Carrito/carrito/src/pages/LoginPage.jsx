import { useState } from "react";
import API from "../core/API";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion(username, password) {
    try {
      const datos = await API.validarUsuario(username, password);

      console.log(datos);

      localStorage.setItem("token", datos.access_token);
      console.log(localStorage.getItem("token"));
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <p>LoginPage</p>
      <label>Usuario:</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => iniciarSesion(username, password)}>
        Iniciar Sesion
      </button>
    </>
  );
}
export default LoginPage;
