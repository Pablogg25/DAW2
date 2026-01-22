import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Padre from "./components/Padre/Padre.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Padre />
  </StrictMode>
);
