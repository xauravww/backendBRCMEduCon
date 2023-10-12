const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  eventLink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  lastdate: {
    type: Date,
    required: true
  },
  forSemester: String,
  organisedBy: String,
  image: String,
});

module.exports = mongoose.model("Event", eventSchema);
