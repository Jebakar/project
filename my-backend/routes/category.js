const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.post("/categories", async (req, res) => {
  try {
    const { name, status } = req.body;
    const category = new Category({ name, status }); 
    await category.save();
    res.status(201).json({ message: "Category added", category }); 
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Failed to add category" }); 
  } 
}); 

// In routes/categoryRoutes.js or similar

// Adjust the path as needed

// GET /api/categories - get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({createdAt: -1});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// In categoryRoutes.js or wherever your routes are defined
router.delete('/:id', async (req, res) => { 
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); 
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 
// routes/categoryRoutes.js
router.put("/categories/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, status },
      { new: true } // return the updated doc
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// pagin
// GET /api/categories?page=1&limit=10
router.get('/categories', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find()
      .sort({ createdAt: -1 }) // optional: sort newest first
      .skip(skip)
      .limit(limit);

    const total = await Category.countDocuments();

    res.json({
      categories,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});


router.post("/delete-multiple", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid request. 'ids' must be an array." });
    }

    await Category.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Categories deleted successfully" });
  } catch (error) {
    console.error("Delete multiple categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
