import { Outlet } from "react-router-dom";
import AppMenu from "../AppMenu/AppMenu.jsx";
function AppLayout() {
  return (
    <>
      <p>AppLayout</p>
      <AppMenu />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
