const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  studentName: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  studentRollNo: {
    type: String,
    required: true,
    },
});

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
  submissions: [
    {
      type: submissionSchema,
    },
  ],  teacherName: String,
  subject: String,
  status: {
    type: String,
    enum: ["pending", "submitted"],
    default: "pending"
  },
  branch: String,
  grades: {
    type:String,
    default:"wait"
  },
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
