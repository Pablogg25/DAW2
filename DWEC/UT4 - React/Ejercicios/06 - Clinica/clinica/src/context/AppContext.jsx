import { useState, createContext } from "react";

/* Creamos el contexto */
const SeguridadContext = createContext();

function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({ usuario: "", tienePermisos: false });

  const logIn = async (nombre) => {
    /* Validar contra un servicio real */
    let nuevoDatos = { ...datos, usuario: nombre, tienePermisos: true };
    setDatos(nuevoDatos);
  };

  const logOut = async () => {
    let nuevoDatos = { ...datos, usuario: "", tienePermisos: false };
    setDatos(nuevoDatos);
  };

  /* Por convenio nombre.Provider */
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
