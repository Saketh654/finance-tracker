import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login (Stores username in Firestore if new user)
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user is new, save their Google display name in Firestore
        await setDoc(userDocRef, {
          username: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
      }

      alert(`Welcome, ${user.displayName}!`);
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button className="button" onClick={handleLogin}>Login</button>
      <br />
      <button className="button google" onClick={handleGoogleLogin}>Sign in with Google</button>
      <br /><br />
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
