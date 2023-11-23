const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },       
  },
  description: {
    type: String,
    required: true
  },
  tags: String, // Array of strings for categorization
  dateOfUpload: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
