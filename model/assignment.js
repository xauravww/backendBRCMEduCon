const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  givenDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  studentName: String,
  studentRollNo: String,
  teacherName: String,
  subject: String,
  status: {
    type: String,
    enum: ["pending","submitted"],
    default: "pending"
  },
  attachment: String,
  feedback: String,
  grades: Number,
  submissionDate: Date,
  lateSubmission: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium"
  },
  tags: [String],
  semester: String
});

module.exports = mongoose.model("Assignment", assignmentSchema);
