import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from './components/homepage';
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RazorpayPayment from "./components/razorpayPayment";


function App() {
  return (
    <>
      <Router>
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<RazorpayPayment userId={localStorage.getItem("userId")} />} />
        </Routes>
      </Router>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
