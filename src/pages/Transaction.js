import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Firebase setup
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/transaction.css";
import Navbar from "../components/Navbar";

const Transaction = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track editing transaction ID

  const categories = ["Food", "Travel", "Shopping", "Entertainment", "Other"];

  // Listen for authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchTransactions(user.uid);
      } else {
        setUser(null);
        setTransactions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch transactions for the logged-in user
  const fetchTransactions = async (uid) => {
    const q = query(collection(db, "transactions"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTransactions(data);
  };

  // Function to add or update transaction
  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first!");

    try {
      if (editingId) {
        // Update existing transaction
        const transactionRef = doc(db, "transactions", editingId);
        await updateDoc(transactionRef, {
          amount: parseFloat(amount),
          category,
          name,
          date: new Date(date).toISOString(),
        });

        setEditingId(null); // Reset editing state
      } else {
        // Add new transaction
        await addDoc(collection(db, "transactions"), {
          userId: user.uid,
          amount: parseFloat(amount),
          category,
          name,
          date: new Date(date).toISOString(),
        });
      }

      // Reset form
      setAmount("");
      setCategory("Food");
      setName("");
      setDate(new Date().toISOString().slice(0, 16));

      // Refresh transactions
      fetchTransactions(user.uid);
    } catch (error) {
      console.error("Error adding/updating transaction:", error);
    }
  };

  // Function to delete a transaction
  const deleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteDoc(doc(db, "transactions", id));
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  // Function to populate fields for editing
  const editTransaction = (transaction) => {
    setEditingId(transaction.id);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setName(transaction.name);
    setDate(transaction.date.slice(0, 16)); // Format for datetime-local input
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="transaction-container">
        <div className="add-transaction">
          <h2>{editingId ? "Edit Transaction" : "Add a Transaction"}</h2>
          <form onSubmit={handleTransaction}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Transaction Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">{editingId ? "Update Transaction" : "Add Transaction"}</button>
          </form>
        </div>
        
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.name} - ₹{transaction.amount} ({transaction.category}) on{" "}
                {new Date(transaction.date).toLocaleString()}
                <button className="edit-btn" onClick={() => editTransaction(transaction)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
