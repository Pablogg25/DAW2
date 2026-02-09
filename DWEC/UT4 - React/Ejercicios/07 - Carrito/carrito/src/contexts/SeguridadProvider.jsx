import { useState, createContext } from "react";
import API from "../core/API";

const SeguridadContext = createContext();

function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({
    username: "",
    tipo: "",
    tienePermisos: false,
  });

  const logIn = async (username, tipo) => {
    let nuevosDatos = { username, tipo, tienePermisos: true };
    setDatos(nuevosDatos);
  };

  const logOut = async () => {
    let nuevosDatos = {
      ...datos,
      username: "", // ← corregido
      tipo: "", // ← correcto
      tienePermisos: false,
    };
    setDatos(nuevosDatos);
  };

  return (
    <SeguridadContext.Provider value={{ datos, logIn, logOut }}>
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
