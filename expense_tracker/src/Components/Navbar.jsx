import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css'; // Navbar specific CSS

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      onLogout(); // Execute the logout logic passed down as props
      navigate('/signin'); // Redirect to sign-in page
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-links">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/add-record" className={location.pathname === '/add-record' ? 'active' : ''}>Add Record</Link>
          <Link to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>Reports</Link>
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link>
        </div>
        <div className="user-profile">
          <span className="user-name">John Doe</span>
          <span className="user-email">john.doe@example.com</span>
          <img src="/public/ProfilPic.jpg" alt="User Avatar" className="user-avatar" />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
