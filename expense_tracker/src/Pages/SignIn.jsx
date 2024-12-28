import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/SignInUp.css';

function SignIn({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login logic here
    console.log("Sign-In form submitted");
    onLogin(); // Update login status
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
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
  );
}

export default SignIn;