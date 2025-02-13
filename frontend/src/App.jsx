import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./context/AuthContext"; // Import useAuth
import Login from "./components/Login";
import Registration from "./components/Registration";
import Menu from "./components/Menu";
import About from "./components/About";
import NavBar from "./components/NavBar";
// import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import CreateMenuItem from "./components/CreateMenuItem";
import ViewMenuPage from "./components/ViewMenuPage";
import EditItemPage from "./components/EditItemPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import AdminOrders from "./components/AdminOrders";
import Orders from "./components/Orders";
import LocationUpdate from "./components/LocationUpdate";

function App() {
  const { isAuthenticated, role } = useAuth(); // Get user role from AuthContext
  console.log("USER ROLE::",role)

  return (
    <Router>
      <NavBar />
      <ToastContainer />
      {/* {isAuthenticated && role !== "admin" && <NavBar />} Only show NavBar for non-admin users */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes (No NavBar for Admin) */}
        {isAuthenticated && role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/adminorders" element={<AdminOrders />} />
            <Route path="/location-update" element={<LocationUpdate />} />
            <Route path="/create-menu" element={<CreateMenuItem />} />
            <Route path="/view-menu" element={<ViewMenuPage />} />
            <Route path="/edit-item/:id" element={<EditItemPage />} />
          </>
        )}

        {/* Customer Routes (NavBar included in each component) */}
        {isAuthenticated && role === "customer" && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
          </>
        )}

        {/* Default Route */}
        <Route path="*" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
