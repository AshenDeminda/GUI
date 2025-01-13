import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css'; // Navbar specific CSS

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-links">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/add-record" className={location.pathname === '/add-record' ? 'active' : ''}>Add Record</Link>
          {/*<Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}>Categories</Link>*/}
          <Link to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>Reports</Link>
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link>
        </div>
        <div className="user-profile">
          <span className="user-name">John Doe</span>
          <span className="user-email">john.doe@example.com</span>
          <img src="/path/to/user/avatar.jpg" alt="User Avatar" className="user-avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;