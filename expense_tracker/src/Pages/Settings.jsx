import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Settings.css";

const Settings = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    currency: "USD",
    currencyFormat: "$",
    deleteAccountPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        return;
      }
      const data = JSON.parse(token)
      const user = data.user.id;

      try {
        const res = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${user}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();

        setUserData((prevData) => ({
          ...prevData,
          id: data.id,
          name: data.full_name,
          email: data.email,
          currency: data.currency,
          currencyFormat: data.currencyFormat,
        }));
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/settings/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        }),
      });
      if (res.ok) toast.success("Profile updated successfully");
      else toast.error("Failed to update profile");
    } catch {
      toast.error("An error occurred");
    }
  };

  const changePassword = async () => {
    if (userData.newPassword !== userData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/settings/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userData.id,
          currentPassword: userData.currentPassword,
          newPassword: userData.newPassword,
        }),
      });
      if (res.ok) toast.success("Password updated successfully");
      else toast.error("Incorrect current password");
    } catch {
      toast.error("An error occurred");
    }
  };

  const updateCurrency = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/settings/update-currency", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userData.id,
          currency: userData.currency,
          currencyFormat: userData.currencyFormat,
        }),
      });
      if (res.ok) toast.success("Currency updated successfully");
      else toast.error("Failed to update currency settings");
    } catch {
      toast.error("An error occurred");
    }
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/settings/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userData.id,
          password: userData.deleteAccountPassword,
        }),
      });
      if (res.ok) toast.success("Account deleted successfully");
      else toast.error("Incorrect password");
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="settings-container">
      <ToastContainer />
      <h1 className="settings-title">Settings</h1>

      {/* Profile Settings */}
      <section className="settings-section">
        <h2 className="section-title">Profile Settings</h2>
        <div className="section-content">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
          </div>
          <button className="btn" onClick={updateProfile}>Update Profile</button>
        </div>
      </section>

      {/* Change Password */}
      <section className="settings-section">
        <h2 className="section-title">Change Password</h2>
        <div className="section-content">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={userData.confirmNewPassword}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn" onClick={changePassword}>Change Password</button>
        </div>
      </section>

      {/* Currency Settings */}
      <section className="settings-section">
        <h2 className="section-title">Currency Settings</h2>
        <div className="section-content">
          <div className="form-group">
            <label>Default Currency</label>
            <select name="currency" value={userData.currency} onChange={handleInputChange}>
              <option value="USD">USD</option>
              <option value="LKR">Sri Lankan Rupees</option>
            </select>
          </div>
          <div className="form-group">
            <label>Currency Formatting</label>
            <select name="currencyFormat" value={userData.currencyFormat} onChange={handleInputChange}>
              <option value="$">$</option>
              <option value="රු">රු</option>
            </select>
          </div>
          <button className="btn" onClick={updateCurrency}>Update Currency</button>
        </div>
      </section>

      {/* Delete Account */}
      <section className="settings-section">
        <h2 className="section-title">Delete Account</h2>
        <div className="section-content">
          <div className="form-group">
            <label>Enter Password</label>
            <input
              type="password"
              name="deleteAccountPassword"
              value={userData.deleteAccountPassword}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;