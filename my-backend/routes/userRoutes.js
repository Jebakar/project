const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const AdminUser = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // create this folder if missing
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "." + ext);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { email, username, password, phone, permissions } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new AdminUser({
      email,
      username,
      password: hashedPassword,
      phone,
      permissions: JSON.parse(permissions),
      photo: req.file ? req.file.filename : null,
    });

    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// admin user

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    

    const users = await AdminUser.find({},'firstName email number').skip(skip).limit(limit).sort({ createdAt: -1 });
    
    const total = await AdminUser.countDocuments();
    
    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example in Express
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await AdminUser.findByIdAndDelete(id); // ✅ Renamed to avoid conflict
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
