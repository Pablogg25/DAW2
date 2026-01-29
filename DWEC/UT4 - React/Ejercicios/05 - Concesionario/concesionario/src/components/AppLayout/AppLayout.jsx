import { Outlet } from "react-router-dom";
import AppMenu from "../AppMenu/AppMenu.jsx";
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
