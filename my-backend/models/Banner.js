const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String },
  shoeImage: { type: String },
   status: { type: Boolean, default: false },
   
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
