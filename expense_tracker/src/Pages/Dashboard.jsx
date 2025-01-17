import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { User, Mail, Calendar, MapPin } from 'lucide-react';
import '../Styles/Dashboard.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ onLogout }) => {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: "28",
    location: "New York, USA",
    occupation: "Software Developer",
  };

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
      data: [100, 200, 100, 150, 250],
      backgroundColor: ['#2563eb', '#34d399', '#fbbf24', '#f87171', '#a78bfa'],
    }],
  };

  const appName = "Balance Buddy";

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">{appName}</h1>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <User size={48} className="profile-icon" />
            </div>
            <h2 className="profile-name">{userData.name}</h2>
            <p className="profile-occupation">{userData.occupation}</p>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <Mail size={18} className="detail-icon" />
              <span className="detail-text">{userData.email}</span>
            </div>

            <div className="profile-detail-item">
              <Calendar size={18} className="detail-icon" />
              <span className="detail-text">{userData.age} years old</span>
            </div>

            <div className="profile-detail-item">
              <MapPin size={18} className="detail-icon" />
              <span className="detail-text">{userData.location}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Balance Cards */}
        <div className="balance-grid">
          <div className="balance-card">
            <h3 className="card-title">Total Balance</h3>
            <p className="card-amount">$3,250.00</p>
          </div>
          
          <div className="balance-card">
            <h3 className="card-title">Monthly Income</h3>
            <p className="card-amount">$2,500.00</p>
          </div>
          
          <div className="balance-card">
            <h3 className="card-title">Monthly Expenses</h3>
            <p className="card-amount">$1,750.00</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Category Breakdown</h3>
            <div className="chart-container">
              <Pie data={categoryData} />
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Spending Trends</h3>
            <div className="chart-container">
              <Line data={expenseData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


