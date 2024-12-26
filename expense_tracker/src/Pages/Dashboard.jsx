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

const Dashboard = () => {
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
      data: [500, 200, 100, 150, 250],
      backgroundColor: ['#2563eb', '#34d399', '#fbbf24', '#f87171', '#a78bfa'],
    }],
  };

  const appName = "Balance Buddy";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-blue-600 text-white h-full shadow-lg fixed">
        {/* App Title */}
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">{appName}</h1>
        </div>

        {/* User Profile Section */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <User size={48} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-blue-200 text-sm">{userData.occupation}</p>
          </div>

          {/* User Details List */}
          <div className="space-y-4 w-full">
            <div className="flex items-center">
              <Mail size={18} className="text-blue-200 mr-2" />
              <span className="text-sm">{userData.email}</span>
            </div>

            <div className="flex items-center">
              <Calendar size={18} className="text-blue-200 mr-2" />
              <span className="text-sm">{userData.age} years old</span>
            </div>

            <div className="flex items-center">
              <MapPin size={18} className="text-blue-200 mr-2" />
              <span className="text-sm">{userData.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8 ml-80 mt-20">
        {/* Balance Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-lg mb-2">Total Balance</h3>
            <p className="text-blue-600 text-2xl font-bold">$3,250.00</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-lg mb-2">Monthly Income</h3>
            <p className="text-blue-600 text-2xl font-bold">$2,500.00</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-lg mb-2">Monthly Expenses</h3>
            <p className="text-blue-600 text-2xl font-bold">$1,750.00</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
            <h3 className="text-gray-600 text-lg mb-4">Category Breakdown</h3>
            <div className="chart-container">
              <Pie data={categoryData} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
            <h3 className="text-gray-600 text-lg mb-4">Spending Trends</h3>
            <div className="chart-container">
              <Line data={expenseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;