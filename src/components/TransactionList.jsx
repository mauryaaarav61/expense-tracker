import React, { useState } from "react";
import "./TransactionList.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const TransactionList = ({
  transactions,
  removeTransaction,
  updateTransaction,
}) => {
  const [editableTransaction, setEditableTransaction] = useState(null);

  const handleUpdateClick = (transaction) => {
    setEditableTransaction({ ...transaction });
  };

  const handleSaveClick = async () => {
    await updateTransaction(editableTransaction._id, editableTransaction);
    setEditableTransaction(null);
  };

  const handleCancelClick = () => {
    setEditableTransaction(null);
  };

  const handleChange = (e, field) => {
    const updatedTransaction = {
      ...editableTransaction,
      [field]: e.target.value,
    };
    setEditableTransaction(updatedTransaction);
  };

  return (
    <div className="main-transaction">
      <h2>All Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <div className="Transaction-list" key={transaction._id}>
            {editableTransaction &&
            editableTransaction._id === transaction._id ? (
              <li id="editable-eliments">
                <input
                  type="text"
                  value={editableTransaction.description}
                  onChange={(e) => handleChange(e, "description")}
                />
                <input
                  type="number"
                  value={editableTransaction.amount}
                  onChange={(e) => handleChange(e, "amount")}
                />
                <select
                  value={editableTransaction.type}
                  onChange={(e) => handleChange(e, "type")}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <div id="save-cancel-btn">
                  <button id="save-btn" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button id="cancel-btn" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <div className="Transaction-list">
                <li>
                  <p id="date-time">
                    {new Date(transaction.date).toLocaleDateString("en-IN")} -{" "}
                    {new Date(transaction.date).toLocaleTimeString("en-IN", {
                      hour12: true,
                    })}{" "}
                    :
                  </p>
                  <hr />
                  {transaction.description}: {transaction.amount} (
                  {transaction.type})
                </li>

                <div className="edit-delete-btn">
                  <pre onClick={() => handleUpdateClick(transaction)}>
                    <CiEdit />
                  </pre>
                  <span onClick={() => removeTransaction(transaction._id)}>
                    <FaDeleteLeft />
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
