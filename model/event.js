const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
  },
  assignTo:{
    type:String,
    required:true
  },
  eventType:{
    type:String,
    required:true
  },
  monthCode:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Event", eventSchema);