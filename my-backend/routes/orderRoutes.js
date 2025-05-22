// In your orderRoutes.js file or wherever you're handling orders
const express = require('express');
const router = express.Router();

// Define the Order schema
const Order = require('../models/Order');

// Handle POST request for placing an order
router.post('/orders', async (req, res) => {
  try {
    const { userEmail, userInfo, addressInfo, paymentMethod, notes, items, total, createdAt } = req.body;

    // Ensure required fields are provided
    if (!userEmail || !userInfo || !addressInfo || !items || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new order
    const order = new Order({
      userEmail,
      userInfo,
      addressInfo,
      paymentMethod,
      notes,
      items,
      total,
      createdAt,
    });

    // Save the order to the database
    await order.save();

    // Send success response
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Get all orders for a specific user by email
router.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    try {
      const orders = await Order.find({ userEmail: email });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: -1 }) // 👈 Sort descending by creation time
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({ orders, total, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
