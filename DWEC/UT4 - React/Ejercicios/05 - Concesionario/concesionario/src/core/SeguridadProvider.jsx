import { useState, createContext } from "react";
import API from "./API.js";

const SeguridadContext = createContext();

function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({
    usuario: "",
    password: "",
    nombre: "",
    tienePermisos: false,
  });

  const logIn = async (credenciales) => {
    const respuesta = await API.validarUsuario(credenciales);

    // Si la API devuelve false → login incorrecto
    if (respuesta === false) {
      setDatos({
        usuario: "",
        password: "",
        nombre: "",
        tienePermisos: false,
      });
      return;
    }

    // Si devuelve un objeto → login correcto
    setDatos({
      usuario: respuesta.username,
      password: respuesta.password,
      nombre: respuesta.nombre,
      tienePermisos: true,
    });
  };

  const logOut = () => {
    setDatos({
      usuario: "",
      password: "",
      nombre: "",
      tienePermisos: false,
    });
  };

  return (
    <SeguridadContext.Provider value={{ datos, logIn, logOut }}>
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
