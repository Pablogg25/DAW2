import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PacientesPage from "../pages/PacientesPage.jsx";

function AppEnrutador() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PacientesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppEnrutador;
