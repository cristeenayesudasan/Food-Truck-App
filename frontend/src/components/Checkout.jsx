import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Box, Typography, Button, Card, CardContent, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
   // Debugging: Log cart items
   console.log("Cart Items:", cart);
   cart.forEach((item, index) => console.log(`Item ${index + 1}:`, item));

  // Calculate Total Price
  const totalAmount = cart.reduce((sum, item) => {
    const price = item.price || item.productId?.price || 0;
    const quantity = item.quantity || 1;
  
    console.log(`Item: ${item.name || item.productId?.name}, Price: ${price}, Quantity: ${quantity}`);
    console.log("Product ID:", item.productId);

    return sum + price * quantity;
  }, 0);
  

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address");
      return;
    }
    console.log("inside hanglecheckout")
    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/orders/checkout",
        { cartItems: cart, totalAmount, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Order Created:", response.data);
      const orderId = response.data.orderId;
      // Clear the frontend cart state after successful order placement
      clearCart();
      localStorage.removeItem("cart");
      sessionStorage.removeItem("cart");
      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.error("Checkout failed!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">Checkout</Typography>

      {cart.map((item, index) => (
        <Card key={item.productId?._id || item.productId || index} sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.productId.name}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Typography>Price: ${((item.price || item.productId?.price || 0) * (item.quantity || 1)).toFixed(2)}</Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5">Total: ${totalAmount}</Typography>

      <TextField
        label="Delivery Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </Box>
  );
};

export default Checkout;
