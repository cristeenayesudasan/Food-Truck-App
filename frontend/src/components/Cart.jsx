import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  console.log("Cart Data from Context:", cart);

  // Ensure correct data mapping
  const cartItems = cart.map((cartItem) => ({
    ...cartItem.productId, // Includes name, price, etc.
    quantity: cartItem.quantity, 
    cartItemId: cartItem._id, // This is what we need to send for updates
  }));

  console.log("Processed Cart Items:", cartItems);

  // Function to update item quantity
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (!cartItemId) {
      console.error("cartItemId is undefined!");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in! Redirecting to login...");
        return;
      }

      if (newQuantity < 1) {
        // If quantity is zero, remove the item
        await axios.delete(`http://localhost:3000/cart/remove/${cartItemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Otherwise, update the quantity
        await axios.put(
          `http://localhost:3000/cart/update/${cartItemId}`,
          { quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error("Failed to update/remove item:", error.response?.data || error);
    }
  };

  // Calculate Grand Total
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: 4,
      
    }}>
      <Typography variant="h3" align="center" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">Your cart is empty.</Typography>
      ) : (
        cartItems.map((item) => (
          <Card key={item.cartItemId} sx={{ marginBottom: 2, padding: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Price: ${item.price}</Typography>

              {/* Quantity Controls */}
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                  <Remove />
                </IconButton>
                <Typography sx={{ marginX: 2 }}>{item.quantity}</Typography>
                <IconButton onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                  <Add />
                </IconButton>
              </Box>

              <Typography fontWeight="bold">Total: ${item.price * item.quantity}</Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* Display Grand Total */}
      {cartItems.length > 0 && (
        <Typography variant="h5" align="right" sx={{ marginTop: 2 }}>
          Grand Total: ${grandTotal}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick= {handleProceedToCheckout}
        sx={{ mt: 2 }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default Cart;
