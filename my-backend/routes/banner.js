const express = require("express");
const router = express.Router();
const multer = require("multer");
const Banner = require("../models/Banner");

// Multer config for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/**
 * @route   POST /api/banners
 * @desc    Create a new banner with background and shoe images
 */
router.post(
  "/",
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "shoeImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, text, description } = req.body;

      const backgroundImage = req.files["backgroundImage"]?.[0]?.filename || "";
      const shoeImage = req.files["shoeImage"]?.[0]?.filename || "";

      const newBanner = new Banner({
        title,
        text,
        description,
        backgroundImage,
        shoeImage,
      });

      await newBanner.save();
      res.status(201).json({ message: "Banner saved successfully", newBanner });
    } catch (error) {
      console.error("Error creating banner:", error);
      res.status(500).json({ error: "Failed to save banner" });
    }
  }
);

/**
 * @route   GET /api/banners
 * @desc    Get all banners (for admin panel)
 */
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch banners" });
  }
});

/**
 * @route   GET /api/banners/enabled
 * @desc    Get only up to 4 enabled banners (for user side)
 */
// router.get("/enabled", async (req, res) => {
//   try {
//     const enabledBanners = await Banner.find({ status: true });
//     res.status(200).json(enabledBanners);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch enabled banners" });
//   }
// });

/**
 * @route   PUT /api/banners/:id/status
 * @desc    Enable or disable a single banner
 */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (status === true) {
      const enabledCount = await Banner.countDocuments({ status: true });
      if (enabledCount >= 4) {
        return res.status(400).json({
          message: "Maximum of 4 banners can be enabled at once.",
        });
      }
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json(updatedBanner);
  } catch (error) {
    console.error("Error updating banner status:", error);
    res.status(500).json({ message: "Server error" }); 
  }
});

/**
 * @route   PUT /api/banners/disableAll
 * @desc    Disable all banners
 */
router.put("/disableAll", async (req, res) => {
  try {
    await Banner.updateMany({}, { status: false });
    res.status(200).json({ message: "All banners disabled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to disable all banners" });
  }
});

/**
 * @route   DELETE /api/banners/:id
 * @desc    Delete a banner by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// GET only enabled banners
router.get("/enabled", async (req, res) => {
  try {
    console.log("Fetching enabled banners...");
    const banners = await Banner.find({ status: true });
    console.log("Found banners:", banners);
    res.status(200).json(banners);
  } catch (error) {
    console.error("Error in /enabled route:", error);
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
