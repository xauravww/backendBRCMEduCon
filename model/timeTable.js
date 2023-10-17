const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  teacherID: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  classCoordinator: {
    type: String,
    required: true
  },
  subjects: [
    {
      subjectName: String,
      isFree: Boolean,
      isPresent: Boolean,
      semester: String,
      period: String,
      startTime: String,
      endTime: String,
      roomNo: String
    }
  ]
});

module.exports = mongoose.model("TimeTable", timeTableSchema);



