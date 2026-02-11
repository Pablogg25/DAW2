import { Outlet } from "react-router-dom";
import AppMenu from "./AppMenu";
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
