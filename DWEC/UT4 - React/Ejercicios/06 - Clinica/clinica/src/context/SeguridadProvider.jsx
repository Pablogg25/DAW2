// contexts/SeguridadProvider.jsx
import { useState, createContext } from "react";

const SeguridadContext = createContext();

function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({
    usuario: "",
    tipo: "",
    tienePermisos: false,
  });

  const logIn = (usuario, tipo) => {
    let nuevoDatos = {
      usuario,
      tipo,
      tienePermisos: true,
    };
    setDatos(nuevoDatos);
  };

  const logOut = () => {
    let nuevoDatos = {
      usuario: "",
      tipo: "",
      tienePermisos: false,
    };
    setDatos(nuevoDatos);
  };

  return (
    <SeguridadContext.Provider
      value={{
        datos,
        logIn,
        logOut,
      }}
    >
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
