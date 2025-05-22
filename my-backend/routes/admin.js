const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path to your User model

// Admin login route
router.post("/login", async (req, res) => {
  const { firstName, password } = req.body;

  console.log("Login attempt received");
  console.log("Request body:", req.body);

  try {
    const user = await User.findOne({ firstName });
    console.log("User retrieved:", user);

    if (!user) {
      console.log("No user found with this first name");
      return res.status(404).json({ message: "Admin not found" });
    }

    // if (user.role !== "admin") {
    //   console.log("User is not an admin");
    //   return res.status(404).json({ message: "Admin not found" });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful, token generated");

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
