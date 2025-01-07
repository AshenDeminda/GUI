import React, { useState } from "react";
import '../Styles/Reports.css';

function Reports() {
  const [timePeriod, setTimePeriod] = useState("This Month");

  // Dummy data
  const totalIncome = 5000;
  const totalExpenses = 3500;
  const netBalance = totalIncome - totalExpenses;

  const expenseBreakdown = [
    { category: "🏠 Rent", amount: 1500 },
    { category: "🛒 Groceries", amount: 800 },
    { category: "🍽 Dining", amount: 400 },
    { category: "🚗 Transport", amount: 800 },
    { category: "🎉 Entertainment", amount: 400 },
    { category: "🔧 Other", amount: 200 },
  ];

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>

      {/* Time Period Selector */}
      <div className="time-period-selector">
        <label htmlFor="time-period" className="time-period-label">Time Period:</label>
        <select
          id="time-period"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="time-period-select"
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <div className="summary-item">
          <h3 className="summary-title">Total Income</h3>
          <p className="summary-amount">${totalIncome}</p>
        </div>
        <div className="summary-item">
          <h3 className="summary-title">Total Expenses</h3>
          <p className="summary-amount">${totalExpenses}</p>
        </div>
        <div className="summary-item">
          <h3 className="summary-title">Net Balance</h3>
          <p className="summary-amount">${netBalance}</p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="breakdown">
        <h3 className="breakdown-title">Expense Breakdown by Category</h3>
        <ul className="breakdown-list">
          {expenseBreakdown.map((item, index) => (
            <li key={index} className="breakdown-item">
              {item.category}: ${item.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reports;