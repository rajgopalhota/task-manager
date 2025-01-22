import React from 'react';
import Navbar from './Navbar';
import AppFooter from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
};

export default Layout;
