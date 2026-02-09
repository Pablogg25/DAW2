import React, { useContext, useEffect } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import { useNavigate } from "react-router-dom";

function PropsProductoPage() {
  const navigate = useNavigate();
  const { datos } = useContext(SeguridadContext);

  useEffect(() => {
    if (
      !datos.tienePermisos ||
      datos.username === "" ||
      datos.tipo !== "admin"
    ) {
      navigate("/");
    }
  }, [datos, navigate]);

  if (!datos.tienePermisos || datos.username === "" || datos.tipo !== "admin") {
    return null;
  }

  return <div>PropsProductoPage</div>;
}

export default PropsProductoPage;
