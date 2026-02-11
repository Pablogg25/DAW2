import React from "react";
import { useNavigate } from "react-router-dom";

function AppMenu() {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li onClick={() => navigate("/")}>EquiposPage</li>
        <li onClick={() => navigate("partidos")}>Partidos</li>
        <li onClick={() => navigate("/clasificacion")}>ClasificacionPage</li>
      </ul>
    </div>
  );
}

export default AppMenu;
