import React from "react";
import "./Auth.css";

function SignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign-in logic here
    console.log("Sign-In form submitted");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="auth-input" required />
        <input type="password" placeholder="Password" className="auth-input" required />
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <p className="auth-footer">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;
