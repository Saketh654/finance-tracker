import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "../components/Navbar";
import "../styles/home.css";
import FeaturesSection from "../components/home/features-section";
import Button from "../components/UI/button";


function Home() {
  return (
    <>
      <Navbar/>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Take Control of Your Finances</h1>
          <p>Track expenses, create budgets, and generate reports to help you make smarter financial decisions and achieve your money goals.</p>
          <div className="cta-buttons">
            <Button content="Get Started Now" variant="PRIMARY"/>
            <Button content="Watch Demo" variant="SECONDARY"/>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Dashboard Preview */}
      <section className="dashboard-preview">
        <div className="container">
          <div className="preview-container">
            <div className="preview-content">
              <h2>Your Financial Dashboard</h2>
              <p>Get a complete overview of your finances at a glance. Our intuitive dashboard shows your spending categories, budget progress, and financial health indicators all in one place.</p>
              <Button content="Start Now" variant="DESTRUCTIVE"/>
            </div>
            <div className="preview-image">
              {/* Placeholder image - replace with your actual dashboard image */}
              <img src="https://via.placeholder.com/600x400" alt="Dashboard Preview" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of people who have improved their financial habits with FinTrack</p>
          </div>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p className="testimonial-text">"FinTrack completely changed how I manage my money. The budgeting tools helped me save an extra $400 each month!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>John Doe</h4>
                  <p>Marketing Specialist</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The reports feature gives me insights I never had before. Now I can see exactly where my money is going and make better decisions."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JS</div>
                <div className="author-info">
                  <h4>Jane Smith</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Setting financial goals and tracking them visually has made saving for our house down payment so much easier and more motivating."</p>
              <div className="testimonial-author">
                <div className="author-avatar">RJ</div>
                <div className="author-info">
                  <h4>Robert Johnson</h4>
                  <p>Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of users who have transformed their financial habits with FinTrack. Sign up today and start your journey to financial freedom.</p>
          <button className="btn btn-light">Create Free Account</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>FinTrack</h3>
              <p>Track, budget, and improve your financial health with our easy-to-use personal finance management tools.</p>
            </div>
            <div className="footer-column">
              <h3>Features</h3>
              <ul className="footer-links">
                <li><a href="#">Transaction Tracking</a></li>
                <li><a href="#">Budgeting Tools</a></li>
                <li><a href="#">Financial Reports</a></li>
                <li><a href="#">Goal Setting</a></li>
                <li><a href="#">Mobile App</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Financial Tips</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Tutorials</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FinTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;