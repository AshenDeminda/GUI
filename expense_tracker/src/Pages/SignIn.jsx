import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignInUp.css";

function SignIn({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Add 'auth-body' class to the body for background and styling
    document.body.classList.add("auth-body");
    return () => {
      // Clean up class when leaving the page
      document.body.classList.remove("auth-body");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-In form submitted");
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="form-input" required />
          <input type="password" placeholder="Password" className="form-input" required />
          <button type="submit" className="form-button">Sign In</button>
        </form>
        <p className="form-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
