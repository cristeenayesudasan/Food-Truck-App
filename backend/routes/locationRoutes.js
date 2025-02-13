const express = require("express");
const router = express.Router();
const Location = require("../model/Location");

// ✅ API to update location (Admin Panel)
router.post("/update", async (req, res) => {
  try {
    await Location.deleteMany({}); // Remove old location
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(200).json({ message: "Location updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating location" });
  }
});

// ✅ API to fetch the latest location (Customer View)
router.get("/current", async (req, res) => {
  try {
    const location = await Location.findOne();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Error fetching location" });
  }
});

module.exports = router;
