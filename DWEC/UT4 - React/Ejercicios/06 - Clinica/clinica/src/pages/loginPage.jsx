import { useContext, useState } from "react";
import { SeguridadContext } from "../context/SeguridadProvider.jsx";
import negocio from "../core/negocio.js";

function LoginPage() {
  const { logIn } = useContext(SeguridadContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    if (username === "" || password === "") return;

    try {
      const usuarioValido = await negocio.validarUsuario(username, password);

      // usuarioValido.tipo ya es: admin | medico | gestion
      logIn(usuarioValido.username, usuarioValido.tipo);
    } catch (e) {
      alert("Usuario o contraseña incorrectos");
    }
  }

  return (
    <>
      <h1>Login</h1>

      <span>Usuario: </span>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <span>Contraseña: </span>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleClick}>Entrar</button>
    </>
  );
}

export default LoginPage;
