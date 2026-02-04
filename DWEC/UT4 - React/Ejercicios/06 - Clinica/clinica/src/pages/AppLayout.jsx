import { Outlet } from "react-router-dom";
import BarraDeNavegacion from "../components/barraDeNavegacion";
import "./AppLayout.css";
function AppLayout() {
  return (
    <>
      <BarraDeNavegacion />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
