import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;