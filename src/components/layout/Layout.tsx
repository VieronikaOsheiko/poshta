import { Outlet } from "react-router-dom";

import AppNavbar from "./AppNavbar";

const Layout = () => {
  return (
    <>
      <header>
        <AppNavbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;