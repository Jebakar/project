const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true }, // match frontend
  category: { type: String, required: true },
  // description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  image: { type: String, required: true }, // image path
  rating: { type: Number, min: 1, max: 5, default: 5 },// optional
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
