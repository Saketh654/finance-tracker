import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/transaction.css";
import Navbar from "../components/Navbar";
import { fetchBudgets } from "./budget"; // Adjust the path as needed


const Transaction = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // New states for filtering and sorting
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");

  const categories = [
    "Food",
    "Entertainment",
    "Shopping",
    "Miscellaneous",
    "Travel",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchTransactions(user.uid); // Existing function to fetch transactions

        // Fetch user-defined categories
        const categoryRef = collection(db, `users/${user.uid}/categories`);
        const querySnapshot = await getDocs(categoryRef);
        const userCategories = querySnapshot.docs.map((doc) => doc.data().name);
      }

      // Merge default and user-defined categories
      else {
        setUser(null);
        setTransactions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTransactions = async (uid) => {
    setLoading(true);
    const q = query(collection(db, "transactions"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTransactions(data);
    setLoading(false);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first!");

    try {
      if (editingId) {
        const transactionRef = doc(db, "transactions", editingId);
        await updateDoc(transactionRef, {
          amount: parseFloat(amount),
          category,
          name,
          date: new Date(date).toISOString(),
        });

        setEditingId(null);
      } else {
        await addDoc(collection(db, "transactions"), {
          userId: user.uid,
          amount: parseFloat(amount),
          category,
          name,
          date: new Date(date).toISOString(),
        });
      }

      setAmount("");
      setCategory("Food");
      setName("");
      setDate(new Date().toISOString().slice(0, 16));

      fetchTransactions(user.uid);
      fetchBudgets(user.uid);
    } catch (error) {
      console.error("Error adding/updating transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteDoc(doc(db, "transactions", id));
        setTransactions(
          transactions.filter((transaction) => transaction.id !== id)
        );
        fetchTransactions(user.uid);
            fetchBudgets(user.uid); 
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  const editTransaction = (transaction) => {
    setEditingId(transaction.id);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setName(transaction.name);
    setDate(transaction.date.slice(0, 16));
  };

  // Filter and sort transactions before displaying
  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        filterCategory === "All" || transaction.category === filterCategory
    )
    .sort((a, b) => {
      if (sortOption === "date-desc")
        return new Date(b.date) - new Date(a.date);
      if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortOption === "amount-desc") return b.amount - a.amount;
      if (sortOption === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  return (
    <div>
      <Navbar />
      <div className="trx_main">
        <br />
        {/* Filter & Sort Options */}
        <div className="filter-sort">
          <label>Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
        </div>
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))
                ) : (
                  <option disabled>No Categories Available</option>
                )}
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
              <button type="submit">
                {editingId ? "Update Transaction" : "Add Transaction"}
              </button>
            </form>
          </div>

          <div className="transaction-history">
            <h3>Transaction History</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {filteredTransactions.map((transaction) => (
                  <li key={transaction.id}>
                    {transaction.name} - ₹{transaction.amount} (
                    {transaction.category}) on{" "}
                    {new Date(transaction.date).toLocaleString()}
                    <button
                      className="edit-btn"
                      onClick={() => editTransaction(transaction)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
