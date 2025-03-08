import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/"); // Redirect to login if not authenticated
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        setUsername(user.displayName || "User"); // Fallback to Google Display Name
      }
    };

    fetchUsername();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Navbar/>
      <h2>Welcome, {username}!</h2>
      <button onClick={() => auth.signOut() && navigate("/")}>Logout</button>
    </div>
  );
}

export default Dashboard;
