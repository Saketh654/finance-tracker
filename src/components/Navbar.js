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
    <nav className="navbar" style={{ textAlign: "center", padding: "20px" , margin: "20px"}}>
      <h2 className="logo">Finance Tracker</h2>
      <ul className="nav-links">
        {user ? ( // If user is logged in, show these links
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/transaction">Transactions</Link></li>
            <li><Link to="/budget">Budget</Link></li>
            <li><Link to="/report">Reports</Link></li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : ( // If user is NOT logged in, show Login & Signup
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
