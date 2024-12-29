import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignInUp.css";

function SignUp({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-body");
    return () => {
      document.body.classList.remove("auth-body");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-Up form submitted");
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
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
    </div>
  );
}

export default SignUp;
