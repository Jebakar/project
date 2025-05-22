const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// Multer setup for storing images in "images" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in images folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage }); 

// Add a new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { productName, category, rating , price, quantity, status } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      productName,
      category,
      // description,
      price,
      quantity,
      status,
      image,
      rating,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Product creation failed:", err);
    res.status(400).json({ error: "Invalid product data" });
  }
});

// Get products with pagination and sort by most recent
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .sort({ _id: -1 }) // Descending order (newest first)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(total / limit), 
      currentPage: page,
    });
  } catch (err) { 
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }   
});  

// routes/product.js or similar
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 
// Assuming you are using Express and Mongoose
// backend/routes/products.js or similar

router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// routes/product.js or similar
router.post('/delete-multiple', async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No product IDs provided" });
  }

  try {
    await Product.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Products deleted successfully" });
  } catch (err) {
    console.error("Error deleting products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// backend/routes/productRoutes.js or similar
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const updatedData = {
      category: req.body.category,
      productName: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      status: req.body.status,
      rating: req.body.rating,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const rawCategory = req.params.category;

    // Convert "comfort-shoes" to "Comfort Shoes"
    const category = rawCategory
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    console.log("Converted category:", category);

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (err) {
    console.error("Error in category route:", err);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router; 
