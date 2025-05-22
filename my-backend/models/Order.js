const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userInfo: {
    name: String,
    phone: String,
  },
  addressInfo: {
    address: String,
    city: String,
    zip: String,
    country: String,
  },
  paymentMethod: String,
  notes: String,
  items: [
    {
      name: { type: String, required: true },
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
  total: { 
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
