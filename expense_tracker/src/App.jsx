import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import AddRecord from './Pages/AddRecord';
import Categories from './Pages/Categories';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import Logout from './Pages/Logout';

import './App.css'; // Main App CSS

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;