const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); 
const router = express.Router();
const UserModel = require('../model/userModel'); 
const RoleModel = require('../model/roleModel'); 
const authMiddleware = require('../middlewares/authMiddleware');
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key"; 

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).populate("roleId");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Stored Password Hash:", user.password_hash); // Log stored password
    console.log("Entered Password:", password); // Log entered password
    

    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Password Match Result:", isMatch); 

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const role = user.roleId.role; 
    console.log("whats inside role:",role)

    const token = jwt.sign(
      { userId: user._id, email: user.email, roleId: user.roleId._id,  role: role  },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        role: role
      }
    });
    console.log("Login Response:", { token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId).select("-password_hash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to create a new user
router.post('/createuser', async (req, res) => {
  try {
    const { name, mobileNo, email, password, roleId, status } = req.body;

    // Validate required fields
    if (!name || !mobileNo || !email || !password || !roleId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate if the roleId exists in the Roles collection
    const roleExists = await RoleModel.findById(roleId);
    if (!roleExists) {
      return res.status(400).json({ message: "Invalid roleId. Role does not exist." });
    }

    // Check for duplicate user by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    // const apwd = await bcrypt.hash("admin123", saltRounds);
    // console.log("Admin password:",apwd)

    // Create a new user document
    const newUser = new UserModel({
      name,
      mobileNo,
      email,
      password_hash, 
      roleId,
      status: status || 'active', 
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        password_hash:savedUser.password_hash,
        roleId: savedUser.roleId,
        status: savedUser.status,

      }, 
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "An error occurred while creating the user" });
  }
});

module.exports = router;
