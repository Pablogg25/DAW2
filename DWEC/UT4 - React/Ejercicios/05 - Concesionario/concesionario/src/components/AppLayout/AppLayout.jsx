import { Outlet } from "react-router-dom";
import AppMenu from "../AppMenu/AppMenu.jsx";
import "./AppLayout.css";
function AppLayout() {
  return (
    <>
      <AppMenu />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
