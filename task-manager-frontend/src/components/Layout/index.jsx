import React from "react";
import Navbar from "./Navbar";
import AppFooter from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="gradient"></div>
      <Navbar />
      <main className="px-16 mt-5 min-h-screen">{children}</main>
      <AppFooter />
    </div>
  );
};

export default Layout;
