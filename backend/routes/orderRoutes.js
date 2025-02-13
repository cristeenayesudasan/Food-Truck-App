const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const authMiddleware = require("../middlewares/authMiddleware");

// 🛒 Create Order API (Checkout)
router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    console.log("Checkout API called!");
    console.log("Request Body:", req.body);

    const { cartItems, totalAmount, address } = req.body;
    const userId = req.user.id;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty!" });
    }

    console.log("User ID:", userId);
    console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
    console.log("Total Amount:", totalAmount);
    console.log("Address:", address);

    // Ensure each item has `price`
    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id, // Extract product ID
      quantity: item.quantity,
      price: item.productId.price, // Extract price from productId object
    }));

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      address,
      paymentStatus: "pending",
      status: "preparing"
    });

    console.log("Saving order...");
    await order.save();
    console.log("Order saved successfully!", order);

    res.json({ message: "Order placed successfully!", orderId: order._id, totalAmount });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed!" });
  }
});

// Get orders for a specific user
router.get("/user-orders/:userId", async (req, res) => {
  try {
      const orders = await Order.find({ userId: req.params.userId }).populate("items.productId");
      res.json(orders);
  } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
  }
});



module.exports = router;
