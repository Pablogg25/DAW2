import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import EquiposPage from "../pages/EquiposPage.jsx";
import PartidosPage from "../pages/PartidosPage.jsx";
import ClasificacionPage from "../pages/ClasificacionPage.jsx";
import NoPage from "../pages/NoPage.jsx";
import PropsPartidoPage from "../pages/PropsPartidoPage.jsx";
import PropsEquipoPage from "../pages/PropsEquipoPage.jsx";
function AppEnrutador() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<EquiposPage />} />
          <Route path="/partidos" element={<PartidosPage />} />
          <Route path="/clasificacion" element={<ClasificacionPage />} />
          <Route path="/partidos/:id" element={<PropsPartidoPage />} />
          <Route path="/equipos/:id" element={<PropsEquipoPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppEnrutador;
