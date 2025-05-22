const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Save filename or URL
  },
  permissions: {
    dashboard: Boolean,
    catalog: Boolean,
    users: Boolean,
    order: Boolean,
  },
}, { timestamps: true });

module.exports = mongoose.model("AdminUser", adminUserSchema);
