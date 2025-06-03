const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");

// schema
app.use(bodyParser.json());
const User = require('./models/User'); // Import the User model

dotenv.config();
const PORT = 9000;
app.use(express.json());
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend port
  methods: ['GET', 'POST','DELETE','PUT'],
  credentials: true,
}));// Allow requests from React app running on localhost:3001
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/mydb")
  .then(() => {
    console.log("MongoDB connected");
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// User Schema

// Signup Route
// app.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, password, number, dob, gender } = req.body;

//   if (!firstName || !lastName || !email || !password || !number || !dob || !gender) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const emailExists = await User.findOne({ email });
//     const phoneExists = await User.findOne({ number });

//     if (emailExists) {
//       return res.status(409).json({ message: "Email already registered" });
//     }
//     if (phoneExists) {
//       return res.status(409).json({ message: "Mobile number already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       number,
//       dob,
//       gender,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// SIGNUP ROUTE

// ✅ SIGNUP ROUTE
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, number, dob, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !number || !dob || !gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const emailExists = await User.findOne({ email });
    const phoneExists = await User.findOne({ number });

    if (emailExists) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    if (phoneExists) {
      return res.status(409).json({ message: 'Mobile number already registered' });
    }

    const newUser = new User({ firstName, lastName, email, password, number, dob, gender });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin Route
// SIGNIN ROUTE
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Sign in successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// SIGN IN
// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Email:", email);
//   console.log("Password:", password);

//   try {
//     const user = await User.findOne({ email });
//     console.log("User found:", user);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match:", isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "yoursecretkey",
//       { expiresIn: '1h' }
//     );

//     return res.status(200).json({
//       message: 'Sign in successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//     });
//   } catch (error) {
//     console.error('Sign in error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



// Reset Password Route
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// order
const orderRoutes = require("./routes/orderRoutes");
const MyOrders = require('./routes/myorder');
app.use("/api", orderRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes); 


app.use('/api/orders', MyOrders);

const adminLoginRoute = require("./routes/adminlogin");
app.use('/api/admin', adminLoginRoute);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const categoryRoutes = require("./routes/category");
app.use("/api",categoryRoutes);
app.use('/api/categories', categoryRoutes);
// 
// app.use('/api/categories', require('./routes/categoryRoutes'));

// 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/userRoutes'); // Adjust the path


app.use('/api/orders', orderRoutes);

app.use('/api/users', userRoutes);

// 
// in your main Express server file
const bannerRoutes = require("./routes/banner"); 
app.use("/api/banners", bannerRoutes);

// 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
