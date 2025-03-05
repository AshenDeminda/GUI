import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignInUp.css";
import { ToastContainer, toast } from 'react-toastify';

function SignUp({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-body");
    return () => {
      document.body.classList.remove("auth-body");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    console.log("Sign-Up form submitted");
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify({ full_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", JSON.stringify(data)); // Store the token in localStorage
      onLogin(); // Trigger any additional login behavior
      navigate("/dashboard"); // Navigate to the dashboard
    } else if (res.status === 409) {
      toast.error("User already exists");
    } else {
      toast.error("An error occurred during sign-up");
    }
  };

  const [full_name, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
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