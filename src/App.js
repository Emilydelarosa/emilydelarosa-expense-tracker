import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const addTransaction = () => {
    if (text.trim() === "" || amount === 0) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000),
      text,
      amount: +amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount(0);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <div className="balance">Your Balance: ${balance.toFixed(2)}</div>
      <div className="income-expense">
        <div>Income: ${income.toFixed(2)}</div>
        <div>Expense: ${Math.abs(expense).toFixed(2)}</div>
      </div>
      <h3>History</h3>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount < 0 ? "expense" : "income"}
          >
            {transaction.text} <span>${transaction.amount.toFixed(2)}</span>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="delete-btn"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <h3>Add new transaction</h3>
      <div className="form">
        <div className="form-control">
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button onClick={addTransaction} className="add-btn">
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default App;
