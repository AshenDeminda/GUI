import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Pages/Dashboard';
import AddRecord from './Pages/AddRecord';
import Categories from './Pages/Categories';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

import './App.css';
import auth from './auth';
import Footer from './Components/Footer';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/signin" />} />
          <Route path="/add-record" element={isLoggedIn ? <AddRecord /> : <Navigate to="/signin" />} />
          <Route path="/categories" element={isLoggedIn ? <Categories /> : <Navigate to="/signin" />} />
          <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/signin" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp onLogin={handleLogin} />} />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;