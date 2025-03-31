import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Budget from "./pages/budget";
import Reports from "./pages/report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />}/>
        <Route path="/budget" element={<Budget />}/>
        <Route path="/report" element={<Reports />}/>

      </Routes>
    </Router>
  );
}

export default App;
