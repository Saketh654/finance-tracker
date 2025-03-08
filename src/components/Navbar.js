import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Finance Tracker</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user ? ( // If user is logged in, show these links
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : ( // If user is NOT logged in, show Login & Signup
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
