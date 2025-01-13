import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignInUp.css";
import { ToastContainer, toast } from 'react-toastify';

function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Add 'auth-body' class to the body for background and styling
    document.body.classList.add("auth-body");
    return () => {
      // Clean up class when leaving the page
      document.body.classList.remove("auth-body");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign-In form submitted");

    const res = await fetch("http://localhost:3000/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      toast.success("Sign-in successful!");
      onLogin(); // Trigger any additional login behavior
      navigate("/dashboard"); // Navigate to the dashboard
    } else if (res.status === 404) {
      toast.error("User not found");
    } else if (res.status === 401) {
      toast.error("Invalid email or password");
    } else {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
