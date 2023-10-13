const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String, // You can use String for storing the image URL or file path
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [String], // Array of strings for categorization
  dateOfUpload: {
    type: Date,
    default: Date.now // Optional, you can remove this if not needed
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
