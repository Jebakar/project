// routes/myorder.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders/user/:email
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await Order.find({ userEmail: email });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router; // ✅ Ensure this is here!
