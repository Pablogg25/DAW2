import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../pages/AppLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Route path="/" element={<AppLayout />}></Route>
    </BrowserRouter>
  );
}
export default AppLayout;
