import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../pages/AppLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import PacientesPage from "../pages/pacientesPage.jsx";
import ExpedientesPage from "../pages/expedientesPage.jsx";
import UsersPage from "../pages/usersPage.jsx";
import LoginPage from "../pages/loginPage.jsx";
import PropsPacientePage from "../pages/PropsPacientePage.jsx";
import PropsExpedientePage from "../pages/PropsExpedientePage.jsx";
import PropsUserPage from "../pages/PropsUserPage.jsx";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />ç
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/expedientes" element={<ExpedientesPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/usuarios/:id" element={<PropsUserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/paciente/:id" element={<PropsPacientePage />} />
          <Route path="expediente/:id" element={<PropsExpedientePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
