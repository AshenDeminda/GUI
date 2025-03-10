import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { User, Mail, Calendar, MapPin } from 'lucide-react';
import '../Styles/Dashboard.css';
import axios from 'axios';

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

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    occupation: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState({
    labels: ['Rent', 'Groceries', 'Dining', 'Transport', 'Entertainment', 'Others'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: ['#2563eb', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#6b7280'],
    }],
  });

  // Fetch user data and transactions
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const parsedToken = JSON.parse(token);
        const userId = parsedToken.user.id;

        // Fetch user data
        const userRes = await axios.get(`http://localhost:3000/user`, {
          headers: { Authorization: `Bearer ${userId}` },
        });

        setUserData({
          name: userRes.data.full_name,
          email: userRes.data.email,
          age: userRes.data.age || "",
          location: userRes.data.location || "",
          occupation: userRes.data.job || "",
        });

        // Fetch transactions
        const transactionsRes = await axios.get(`http://localhost:3000/transaction?user=${userId}`);
        setTransactions(transactionsRes.data);

        // Update category data for the pie chart
        const order = ['rent', 'groceries', 'dining', 'transport', 'entertainment'];
        const values = new Array(order.length + 1).fill(0);
        for (let expense of transactionsRes.data.filter(t => t.type === "expense")) {
          const index = order.indexOf(expense.category);
          if (index !== -1) {
            values[index] += expense.amount;
          } else {
            values[values.length - 1] += expense.amount;
          }
        }
        setCategoryData({
          labels: ['Rent', 'Groceries', 'Dining', 'Transport', 'Entertainment', 'Others'],
          datasets: [{
            data: values,
            backgroundColor: ['#2563eb', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#6b7280'],
          }],
        });

      } catch (error) {
        console.error("Failed to fetch user data or transactions", error);
      }
    };

    fetchUserData();
  }, []);

  const expenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [1500, 1700, 1600, 1800, 1750, 1900],
      borderColor: '#2563eb',
      tension: 0.4,
    }],
  };

  const expenses = transactions.filter(t => t.type === "expense");
  const incomes = transactions.filter(t => t.type === "income");

  const income = incomes.reduce((prv, curr) => prv + curr.amount, 0);
  const expense = expenses.reduce((prv, curr) => prv + curr.amount, 0);
  const total = income - expense;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Balance Buddy</h1>
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
            <p className="card-amount">{total.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</p>
          </div>

          <div className="balance-card">
            <h3 className="card-title">Monthly Income</h3>
            <p className="card-amount">{income.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</p>
          </div>

          <div className="balance-card">
            <h3 className="card-title">Monthly Expenses</h3>
            <p className="card-amount">{expense.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</p>
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