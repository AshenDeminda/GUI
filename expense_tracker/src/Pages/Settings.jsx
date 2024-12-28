import React, { useState } from 'react';
import '../Styles/Settings.css';

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    currency: "USD",
    currencyFormat: "$",
    deleteAccountPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = () => {
    if (userData.newPassword !== userData.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }
    // Add logic for password change
    console.log("Password changed successfully.");
  };

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      // Add logout logic here
      console.log("Logged out successfully.");
    }
  };

  const handleDeleteAccount = () => {
    if (!userData.deleteAccountPassword) {
      alert("Please enter your password to delete your account.");
      return;
    }
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmation) {
      // Add account deletion logic here
      console.log("Account deleted successfully.");
    }
  };

  return (
    <div className="settings-container">
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
          <div className="form-group">
            <label>Profile Picture (optional)</label>
            <input type="file" name="profilePicture" />
          </div>
          <button className="btn" onClick={handleLogout}>Logout</button>
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
          <button className="btn" onClick={handlePasswordChange}>Change Password</button>
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
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </section>

      {/* Help and Support */}
      <section className="settings-section">
        <h2 className="section-title">Help and Support</h2>
        <div className="section-content">
          <a href="/faq" className="link">FAQ Section</a>
          <a href="/contact-support" className="link">Contact Support</a>
        </div>
      </section>
    </div>
  );
};

export default Settings;
