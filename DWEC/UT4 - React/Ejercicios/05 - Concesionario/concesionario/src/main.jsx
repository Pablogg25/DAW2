import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppEnrutado from "./routes/AppEnrutador.jsx";
// import "./index.css";
// import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppEnrutado />
  </StrictMode>,
);
