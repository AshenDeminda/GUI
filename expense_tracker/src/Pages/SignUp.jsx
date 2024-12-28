import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/SignInUp.css';

function SignUp({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful sign-up logic here
    console.log("Sign-Up form submitted");
    onLogin(); // Update login status
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" className="form-input" required />
        <input type="email" placeholder="Email" className="form-input" required />
        <input type="password" placeholder="Password" className="form-input" required />
        <input type="password" placeholder="Confirm Password" className="form-input" required />
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      <p className="form-footer">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;