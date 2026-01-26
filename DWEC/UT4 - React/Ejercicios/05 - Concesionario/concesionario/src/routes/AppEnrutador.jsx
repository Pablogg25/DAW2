import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import MantenimientoPage from "../pages/MantenimientoPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import PropsCochePage from "../pages/PropsCochePage";
function AppEnrutador() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="mantenimiento" element={<MantenimientoPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="props/:id" element={<PropsCochePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppEnrutador;
