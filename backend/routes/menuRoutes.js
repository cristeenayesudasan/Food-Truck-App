const express = require("express");
const multer = require("multer");
const MenuItem = require("../model/MenuItem");
const cloudinary = require("../config/cloudinary"); // Correct import

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Convert cloudinary uploader to a promise-based function
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "menu-items" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });
  };


router.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await streamUpload(req.file.buffer);
    console.log("Uploaded Image:", result.secure_url);

    // Convert JSON string to object
    const nutritionalValues = JSON.parse(req.body.nutritionalValues);
    console.log(nutritionalValues);
    // Create new menu item
    const newMenuItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients.split(",").map((i) => i.trim()), // Trim spaces
      nutritionalValues,
      dietTags: req.body.dietTags.split(",").map((tag) => tag.trim()),
      price: Number(req.body.price),
      allergyInfo: req.body.allergyInfo,
      availability: req.body.availability === "true",
      imageUrl: result.secure_url, // Store Cloudinary image URL
    });

    // Save to database
    await newMenuItem.save();
    res.status(201).json({ message: "Menu item created successfully", menuItem: newMenuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/menuUpdate/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = { ...req.body }; // Copy body data

    // Check if an image is uploaded
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      updatedData.imageUrl = result.secure_url;
    }

    // Convert JSON string to object only if it's a string
    if (typeof updatedData.nutritionalValues === "string") {
      try {
        updatedData.nutritionalValues = JSON.parse(updatedData.nutritionalValues);
      } catch (error) {
        console.error("Invalid JSON format for nutritionalValues", error);
        return res.status(400).json({ error: "Invalid nutritionalValues format" });
      }
    }

    // Convert comma-separated strings into arrays
    if (updatedData.ingredients) {
      updatedData.ingredients = updatedData.ingredients.split(",").map(i => i.trim());
    }
    if (updatedData.dietTags) {
      updatedData.dietTags = updatedData.dietTags.split(",").map(tag => tag.trim());
    }

    // Ensure price is a number
    if (updatedData.price) {
      updatedData.price = Number(updatedData.price);
    }

    // Ensure availability is a boolean
    if (updatedData.availability) {
      updatedData.availability = updatedData.availability === "true";
    }

    // Find and update the menu item
    const updatedItem = await MenuItem.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item updated successfully", updatedItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a menu item by ID
router.delete("/menuDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Trim any whitespace or newline characters from the ID
    const cleanedId = id.trim();

    // Find and delete the menu item by ID
    const deletedItem = await MenuItem.findByIdAndDelete(cleanedId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully", deletedItem });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get a single menu item by ID
router.get("/menuitem/:id", async (req, res) => {
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

// Fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// Export Routes
module.exports = router;
