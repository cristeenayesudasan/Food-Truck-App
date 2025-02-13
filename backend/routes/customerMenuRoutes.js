const express = require("express");
const MenuItem = require("../model/MenuItem");

const router = express.Router();

// Customer Routes

// Get all menu items (for customers)
router.get("/menuitems", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// Get a specific menu item by ID (for customers)
router.get("/menuitems/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
