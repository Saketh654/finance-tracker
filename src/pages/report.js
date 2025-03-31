import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import "../styles/report.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const categories = ["Food", "Travel", "Shopping", "Entertainment", "Miscellaneous"];

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

  const fetchTransactions = async (uid) => {
    const q = query(collection(db, "transactions"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTransactions(data);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      (!start || transactionDate >= start) &&
      (!end || transactionDate <= end) &&
      (filterCategory === "All" || transaction.category === filterCategory)
    );
  });

  const totalSpent = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div>
      <Navbar />
      <div className="reports-container">
        <h2>Financial Reports</h2>
        <div className="filters">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <label>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <h3>Total Spent: ₹{totalSpent}</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.name}</td>
                <td>{transaction.category}</td>
                <td>₹{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
