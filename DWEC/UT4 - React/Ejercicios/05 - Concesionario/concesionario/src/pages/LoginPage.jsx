import API from "../core/API.js";
import { useContext, useState } from "react";
import { SeguridadContext } from "../core/SeguridadProvider.jsx";

function LoginPage() {
  const { datos, logIn, logOut } = useContext(SeguridadContext);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleClick() {
    if (datos.tienePermisos) {
      setUser("");
      setPass("");
      logOut();
    } else {
      if (user === "" || pass === "") return;
      logIn({ username: user, password: pass });
    }
  }

  return (
    <>
      <p>LoginPage</p>
      <div>
        {datos.tienePermisos ? (
          <>
            <span>Hola {datos.nombre}</span>
            <button onClick={handleClick}>Salir</button>
          </>
        ) : (
          <>
            <label>Usuario: </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <label>Contraseña: </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button onClick={handleClick}>Iniciar Sesión</button>
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;
