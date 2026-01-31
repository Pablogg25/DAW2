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
      logOut();
    } else {
      if (user === "") {
        return;
      }
      logIn({ username: user, password: pass  });
    }
  }

  const handleChange1 = (u) => {
    setUser(u.target.value);
  };
  const handleChange2 = (p) => {
    setPass(p.target.value);
  };
  return (
    <>
      <p>LoginPage</p>
      <div>
        {datos.tienePermisos ? (
          <>
            <span>Hola {datos.nombre} </span>
            <button onClick={handleClick}>Salir</button>
          </>
        ) : (
          <>
            <label>Usuario: </label>
            <input
              type="text"
              name="user"
              value={user}
              onChange={handleChange1}
            />
            <label>Contraseña: </label>
            <input
              type="password"
              name="pass"
              value={pass}
              onChange={handleChange2}
            />
            <button onClick={handleClick}>Inciar Sesión</button>
          </>
        )}
      </div>
    </>
  );
}
export default LoginPage;
