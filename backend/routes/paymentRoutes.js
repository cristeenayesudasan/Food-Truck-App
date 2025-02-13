const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const Cart = require("../model/Cart");
const Razorpay = require("razorpay");
const authMiddleware = require('../middlewares/authMiddleware');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment Initiation
router.post("/pay", async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json({ error: "Order not found!" });

    const payment = await razorpay.orders.create({
      amount: order.totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: orderId,
    });

    res.json({ paymentId: payment.id, amount: payment.amount });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ error: "Payment failed!" });
  }
});

// Payment Confirmation (After Successful Razorpay Payment)
router.post("/confirm",authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" });

    res.json({ message: "Payment successful!", paymentId });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ error: "Failed to confirm payment!" });
  }
});

router.post("/success",authMiddleware, async (req, res) => {
  const { orderId, paymentId } = req.body;
  console.log("Received /success request:", req.body);
  console.log("USER",req.user);

  try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { 
          paymentStatus: "completed"
      });

      if (!updatedOrder) {
          console.error("Order not found!");
          return res.status(404).json({ success: false, message: "Order not found" });
      }

      console.log("Order updated successfully:", updatedOrder);

      // Check if req.user exists
      if (!req.user || !req.user.id) {
          console.error("User ID not found in request!");
          return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const deletedCart = await Cart.deleteOne({ userId: req.user.id });

      console.log("Deleted cart result:", deletedCart);

      res.json({ success: true, message: "Payment successful and cart cleared" });
  } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ success: false, message: "Error updating payment status" });
  }
});



module.exports = router;
