import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./router/AppRouter.jsx";
import { SeguridadProvider } from "./context/SeguridadProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SeguridadProvider>
      <AppRouter />
    </SeguridadProvider>
  </StrictMode>,
);
