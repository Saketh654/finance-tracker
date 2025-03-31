import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Firebase setup
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
import "../styles/budget.css";
import Navbar from "../components/Navbar";

const Budget = () => {
  const predefinedCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Entertainment",
    "Other",
  ];
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("Monthly");
  const [customCategory, setCustomCategory] = useState("");
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBudgets(user.uid);
      } else {
        setUser(null);
        setBudgets([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchBudgets = async (uid) => {
    // 🔹 Fetch user budgets
    const budgetQuery = query(
      collection(db, "budgets"),
      where("userId", "==", uid)
    );
    const budgetSnapshot = await getDocs(budgetQuery);
    const budgetsData = budgetSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 🔹 Fetch user transactions
    const transactionQuery = query(
      collection(db, "transactions"),
      where("userId", "==", uid)
    );
    const transactionSnapshot = await getDocs(transactionQuery);
    const transactionsData = transactionSnapshot.docs.map((doc) => doc.data());

    // 🔹 Calculate total spent per category
    const spentMap = {};
    transactionsData.forEach(({ category, amount }) => {
      spentMap[category] = (spentMap[category] || 0) + amount;
    });

    // 🔹 Update budgets with spent money
    const updatedBudgets = budgetsData.map((budget) => ({
      ...budget,
      spent: spentMap[budget.category] || 0, // If no transactions, spent = 0
    }));

    setBudgets(updatedBudgets);
  };

  const handleBudget = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first!");

    try {
      if (editingId) {
        // 🔹 If editing, update existing budget in Firestore
        const budgetRef = doc(db, "budgets", editingId);
        await updateDoc(budgetRef, {
          category,
          amount: parseFloat(amount),
          timeline,
        });
        setEditingId(null);
      } else {
        // 🔹 If new budget, add it to Firestore
        await addDoc(collection(db, "budgets"), {
          userId: user.uid,
          category,
          amount: parseFloat(amount),
          timeline,
        });
      }

      // Reset input fields
      setCategory("Food");
      setAmount("");
      setTimeline("Monthly");

      // Fetch updated budget list
      fetchBudgets(user.uid);
    } catch (error) {
      console.error("Error adding/updating budget:", error);
    }
  };

  const deleteBudget = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await deleteDoc(doc(db, "budgets", id));
        setBudgets(budgets.filter((budget) => budget.id !== id));
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    }
  };

  const editBudget = (budget) => {
    setEditingId(budget.id); // Store the ID of the budget being edited
    setCategory(budget.category);
    setAmount(budget.amount);
    setTimeline(budget.timeline);
  };

  return (
    <div>
      <Navbar />
      <div className="budget-main">
        <div className="budget-container">
          <h2>{editingId ? "Edit Budget" : "Set a Budget"}</h2>
          <form onSubmit={handleBudget}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {predefinedCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>

            {category === "Custom" && (
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}

            <input
              type="number"
              placeholder="Budget Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <button type="submit">
              {editingId ? "Update Budget" : "Add Budget"}
            </button>
          </form>
        </div>
        <div className="budget-list">
          <h3>Budget List</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Timeline</th>
                <th>Budget</th>
                <th>Spent Money</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.category}</td>
                  <td>{budget.timeline}</td>
                  <td>₹{budget.amount}</td>
                  <td>₹{budget.spent}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editBudget(budget)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBudget(budget.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;
export const fetchBudgets = async (uid) => {
  const q = query(collection(db, "budgets"), where("userId", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
  }));
};

