import { useContext, useState } from "react";
import { SeguridadContext } from "../context/SeguridadProvider";
import negocio from "../core/negocio.js";
function LoginPage() {
  const { datos, logIn, logOut } = useContext(SeguridadContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUsername(e) {
    const { name, value } = e.target;
    setUsername((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  }

  async function validarUsuario() {
    const usuarioValido = await negocio.validarUsuario(username, password);
  }
  return (
    <>
      <p>Login</p>
      <label>Usuario: </label>
      <input type="text" onChange={handleChangeUsername} />
      <label>Contraseña: </label>
      <input type="password" onChange={handleChangePassword} />
      <br />
      <button>Iniciar Sesion</button>
    </>
  );
}
export default LoginPage;
