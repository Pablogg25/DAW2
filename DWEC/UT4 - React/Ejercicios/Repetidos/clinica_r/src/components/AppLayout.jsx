import React from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";
function AppLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
