import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "../components/AppLayout";
// const AppLayout = lazy(() => import("../components/AppLayout"));

const EquiposPage = lazy(() => import("../pages/EquiposPage.jsx"));
const PartidosPage = lazy(() => import("../pages/PartidosPage.jsx"));
function AppEnrutador() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<EquiposPage />} />
            <Route path="partidos" element={<PartidosPage />} />

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppEnrutador;
