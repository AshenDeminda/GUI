import React from "react";
import "./Auth.css";

function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign-up logic here
    console.log("Sign-Up form submitted");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" className="auth-input" required />
        <input type="email" placeholder="Email" className="auth-input" required />
        <input type="password" placeholder="Password" className="auth-input" required />
        <input type="password" placeholder="Confirm Password" className="auth-input" required />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p className="auth-footer">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;
