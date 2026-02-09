import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AppLayout from "../pages/AppLayout";
import CarritoPage from "../pages/CarritoPage";
import PropsProductoPage from "../pages/PropsProductoPage";
import ErrorPage from "../pages/ErrorPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import AdminProductsPage from "../pages/AdminProductsPage.jsx";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="carrito" element={<CarritoPage />} />
          <Route path="producto/:id" element={<PropsProductoPage />} />
          <Route path="/inicioSesion" element={<LoginPage />} />
          <Route path="/adminProducts" element={<AdminProductsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
