import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

import './App.css'

function App() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`,{ withCredentials: true });
                setTransactions(response.data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    const addTransaction = async (newTransaction) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, newTransaction , { withCredentials: true }); 
            setTransactions([...transactions, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeTransaction = async (transactionId) => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}`, { withCredentials: true });
          setTransactions(transactions.filter((transaction) => transaction._id !== transactionId));
        } catch (error) {
          console.error(error);
        }
    };

    const updateTransaction = async (transactionId , updateTransaction)=>{
      try {
          const response = await axios.patch(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}`,updateTransaction , { withCredentials: true });
          setTransactions(transactions.map((transaction)=>(transaction._id===transactionId ?response.data :transaction)));
          
      } catch (error) {
          console.error(error);
      }
    }

    return (
        <div>
            <h1 className='main-Header'>Expence Tracker </h1>
            <TransactionForm addTransaction={addTransaction} />
            <TransactionList transactions={transactions}  removeTransaction={removeTransaction}  updateTransaction={updateTransaction} />
        </div>
    );
}

export default App;
