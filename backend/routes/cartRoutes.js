const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware to get logged-in user

// ✅ GET Cart Items for a Logged-in User
router.get("/", authMiddleware, async (req, res) => {
    console.log("Inside GET cart route");
    console.log("User ID from token:", req.user.id);
  
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  
      if (!cart) {
        console.log("Cart not found for user:", req.user.id);
        return res.json([]);
      }
  
      console.log("Cart found:", cart);
      res.json(cart.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

// ✅ Add Item to Cart
router.post("/add", authMiddleware, async (req, res) => {
    console.log("Inside add cart route");
  const { productId, quantity } = req.body;
  console.log("User ID:", req.user.id);
    console.log("Product ID:", req.body.productId);
    console.log("Quantity:", req.body.quantity);

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});


// ✅ Update Item Quantity in Cart (Using cartItemId)
router.put("/update/:cartItemId", authMiddleware, async (req, res) => {
  console.log("Inside update cart route");
  const { quantity } = req.body;
  console.log("Updating quantity to:", quantity);
  console.log("User ID from frontend:", req.user.id);

  try {
      let cart = await Cart.findOne({ userId: req.user.id });

      if (!cart) {
          console.error("Cart not found for user:", req.user.id);
          return res.status(400).json({ error: "Cart not found" });
      }

      // ✅ Find the cart item using `_id` instead of `productId`
      const item = cart.items.find((item) => item._id.toString() === req.params.cartItemId);
      if (!item) {
          console.error("Item not found in cart");
          return res.status(404).json({ error: "Item not found in cart" });
      }

      if (quantity < 1) {
          // Remove item if quantity is 0
          cart.items = cart.items.filter((item) => item._id.toString() !== req.params.cartItemId);
      } else {
          item.quantity = quantity;
          console.log(`Updated quantity to ${quantity}`);
      }

      await cart.save();
      res.json(cart);
  } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update quantity" });
  }
});

// ✅ Remove Item from Cart by cartItemId
router.delete("/remove/:cartItemId", authMiddleware, async (req, res) => {
  console.log("Inside remove cart route");

  try {
      let cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) return res.status(400).json({ error: "Cart not found" });

      // Use `_id` instead of `productId`
      cart.items = cart.items.filter((item) => item._id.toString() !== req.params.cartItemId);

      await cart.save();
      res.json(cart);
  } catch (error) {
      console.error("Error removing item:", error);
      res.status(500).json({ error: "Failed to remove item" });
  }
});


module.exports = router;
