import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import '../Styles/Dashboard.css'; // Dashboard specific CSS

const Dashboard = () => {
  const expenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [1500, 1700, 1600, 1800, 1750, 1900],
      borderColor: '#2563eb',
      tension: 0.4,
    }],
  };

  const categoryData = {
    labels: ['Rent', 'Groceries', 'Dining', 'Transport', 'Entertainment'],
    datasets: [{
      data: [500, 200, 100, 150, 250],
      backgroundColor: ['#2563eb', '#34d399', '#fbbf24', '#f87171', '#a78bfa'],
    }],
  };

  const appName = "Balance Buddy";

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{appName}</h1>
        <div className="user-profile">
          <span className="user-name">John Doe</span>
          <span className="user-email">john.doe@example.com</span>
          <img src="/path/to/user/avatar.jpg" alt="User Avatar" className="user-avatar" />
        </div>
      </header>

      <div className="financial-summary">
        <div className="card">
          <h3>Total Balance</h3>
          <div className="amount">$3,250.00</div>
        </div>
        <div className="card">
          <h3>Monthly Income</h3>
          <div className="amount">$2,500.00</div>
        </div>
        <div className="card">
          <h3>Monthly Expenses</h3>
          <div className="amount">$1,750.00</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="card">
          <h2>Category Breakdown</h2>
          <div className="chart-container">
            <Pie data={categoryData} />
          </div>
        </div>
        <div className="card">
          <h2>Spending Trends</h2>
          <div className="chart-container">
            <Line data={expenseData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;