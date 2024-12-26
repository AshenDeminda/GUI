import React, { useState } from 'react';
import '../Styles/AddRecord.css';

const AddRecord = () => {
  const [transaction, setTransaction] = useState({
    type: 'expense',
    category: '',
    customCategory: '',
    description: '',
    amount: '',
  });
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...transaction, date: new Date().toLocaleDateString() };
    setRecords([...records, newRecord]);
    setTransaction({ type: 'expense', category: '', customCategory: '', description: '', amount: '' });
  };

  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);

  const totalExpense = records
    .filter((record) => record.type === 'expense')
    .reduce((acc, record) => acc + parseFloat(record.amount), 0);

  const netBalance = totalIncome - totalExpense;

  const incomeCategories = ['💰 Salary', '🛠 Freelance', '📈 Investments'];
  const expenseCategories = ['🏠 Rent', '🛒 Groceries', '🍽 Dining', '🚗 Transport', '🎉 Entertainment'];

  const getCategoryData = (type) => {
    const categories = type === 'income' ? incomeCategories : expenseCategories;
    return categories.map(category => ({
      category,
      amount: records
        .filter(record => record.type === type && record.category === category)
        .reduce((acc, record) => acc + parseFloat(record.amount), 0)
    }));
  };

  const filteredData = filter === 'all' ? [
    { category: 'Income', amount: totalIncome },
    { category: 'Expense', amount: totalExpense }
  ] : getCategoryData(filter);

  return (
    <div className="container">
      <div className="form-card">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${transaction.type === 'expense' ? 'active' : ''}`}
            onClick={() => setTransaction({ ...transaction, type: 'expense' })}
          >
            Expense
          </button>
          <button
            className={`toggle-btn ${transaction.type === 'income' ? 'active' : ''}`}
            onClick={() => setTransaction({ ...transaction, type: 'income' })}
          >
            Income
          </button>
        </div>

        <h2>{transaction.type === 'expense' ? 'Add New Expense' : 'Add New Income'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {transaction.type === 'income' ? (
                <>
                  <option value="salary">💰 Salary</option>
                  <option value="freelance">🛠 Freelance</option>
                  <option value="investments">📈 Investments</option>
                </>
              ) : (
                <>
                  <option value="rent">🏠 Rent</option>
                  <option value="groceries">🛒 Groceries</option>
                  <option value="dining">🍽 Dining</option>
                  <option value="transport">🚗 Transport</option>
                  <option value="entertainment">🎉 Entertainment</option>
                </>
              )}
              <option value="other">Other</option>
            </select>
          </div>

          {transaction.category === 'other' && (
            <div className="form-group">
              <label htmlFor="customCategory">Custom Category</label>
              <input
                type="text"
                id="customCategory"
                name="customCategory"
                value={transaction.customCategory}
                onChange={handleChange}
                placeholder="Enter custom category"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>

          <button type="submit" className="add-btn">Add Transaction</button>
        </form>
      </div>

      <div className="summary-card">
        <h2>Financial Summary</h2>

        <div className="summary-item">
          <span className="summary-label">Total Income</span>
          <span className="summary-value positive">${totalIncome.toFixed(2)}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Total Expense</span>
          <span className="summary-value negative">${totalExpense.toFixed(2)}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Net Balance</span>
          <span className="summary-value">${netBalance.toFixed(2)}</span>
        </div>

        <div className="filter-container">
          <label htmlFor="filter">Filter</label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="filtered-summary">
          <h3>{filter === 'all' ? 'All Transactions' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Summary'}</h3>
          <ul>
            {filteredData.map(data => (
              <li key={data.category}>
                <span>{data.category}</span>: <span>${data.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;