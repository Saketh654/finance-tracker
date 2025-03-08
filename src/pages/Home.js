import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "../components/Navbar";
import "../styles/home.css";

function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1>Take Control of Your Finances</h1>
        <p>Track your expenses, set budgets, and gain insights into your spending.</p>
        <Link to="/signup">
          <motion.button 
            className="cta-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="features"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2>Features</h2>
        <ul>
          <li>✅ Expense Tracking</li>
          <li>✅ Budget Management</li>
          <li>✅ Reports & Insights</li>
          <li>✅ Secure & Private</li>
        </ul>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        className="how-it-works"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2>How It Works</h2>
        <p>📝 Sign up for an account</p>
        <p>💰 Add transactions & set budgets</p>
        <p>📊 Analyze your financial health</p>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="testimonials"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.9 }}
      >
        <h2>What Users Say</h2>
        <p>⭐ "This app changed the way I manage money!" – John Doe</p>
        <p>⭐ "Budgeting has never been this easy!" – Jane Smith</p>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div 
        className="cta"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 1.2 }}
      >
        <h2>Start Managing Your Finances Today!</h2>
        <Link to="/signup">
          <motion.button 
            className="cta-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up Now
          </motion.button>
        </Link>
      </motion.div>

    </div>
  );
}

export default Home;
