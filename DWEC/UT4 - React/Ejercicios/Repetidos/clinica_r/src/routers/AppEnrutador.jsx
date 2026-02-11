import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PacientesPage from "../pages/PacientesPage.jsx";
import PacientePage from "../pages/PacientePage.jsx";

function AppEnrutador() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PacientesPage />} />
          <Route path="/paciente/:id" element={<PacientePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppEnrutador;
