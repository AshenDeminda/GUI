import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import auth from '../auth';
import axios from 'axios';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          const res = await axios.get("http://localhost:3000/user", {
            headers: { Authorization: `Bearer ${parsedToken.user.id}` },
          });
          setUserData(res.data);
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      }
    };

    fetchUserData();
  }, []);
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      onLogout();
      navigate('/signin');
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
          <span className="user-name">{userData?.full_name || 'User'}</span>
          <span className="user-email">{userData?.email || 'user@example.com'}</span>
          <img src="/public/ProfilPic.jpg" alt="User Avatar" className="user-avatar" />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;