import React, { useContext, useEffect } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import { useNavigate } from "react-router-dom";

function PropsProductoPage() {
  const navigate = useNavigate();
  const { datos } = useContext(SeguridadContext);

  const tipoNormalizado = datos.tipo.trim().toLowerCase();
  useEffect(() => {
    if (
      !datos.tienePermisos ||
      datos.username === "" ||
      tipoNormalizado !== "administrador"
    ) {
      navigate("/");
    }
  }, [datos, navigate, tipoNormalizado]);

  if (!datos.tienePermisos || datos.username === "" || datos.tipo !== "admin") {
    return null;
  }

  return <div>PropsProductoPage</div>;
}

export default PropsProductoPage;
