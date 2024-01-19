import React, { useState } from "react";
import "./TransactionForm.css";

const TransactionForm = ({ addTransaction }) => {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    type: "income" ,
    
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(transaction);
    setTransaction({ description: "", amount: "", type: "income" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="description"
          value={transaction.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter full Details.."
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter Total Amount.."
          required
        />
      </div>
      <div>
        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="income">Total Income</option>
          <option value="expense">Total Expense</option>
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
