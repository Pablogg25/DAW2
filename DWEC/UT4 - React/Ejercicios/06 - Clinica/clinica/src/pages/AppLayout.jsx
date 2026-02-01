import { Outlet } from "react-router-dom";
import BarraDeNavegacion from "../components/barraDeNavegacion";
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
