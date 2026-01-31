import { useState, createContext } from "react";
import API from "./API.js";
const SeguridadContext = createContext();

function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({
    usuario: "",
    password: "",
    tienePermisos: false,
  });

  const logIn = async (datos) => {
    let respuesta = await API.validarUsuario(datos);
    let nuevosDatos;
    if (respuesta !== false) {
      nuevosDatos = {
        ...datos,
        tienePermisos: true,
      };
      console.log(respuesta);
    }
    setDatos(nuevosDatos);
  };

  const logOut = async () => {
    let nuevoDatos = { ...datos, usuario: "", tienePermisos: false };
    setDatos(nuevoDatos);
  };

  return (
    <SeguridadContext.Provider value={{ datos, logIn, logOut }}>
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
