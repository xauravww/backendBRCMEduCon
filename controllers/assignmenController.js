const Assignment = require('../model/assignment');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Assignment
exports.createAssignment = catchAsyncErrors(async (req, res, next) => {
  const {
    title,description,givenDate,dueDate,studentName,
    studentRollNo,teacherName,subject,status,
    attachment,feedback,grades,submissionDate,
    lateSubmission,priority,tags,semester} = req.body;

  const newAssignment = await Assignment.create({
    title,description,givenDate,dueDate,studentName,
    studentRollNo,teacherName,subject,status,
    attachment,feedback,grades,submissionDate,
    lateSubmission,priority,tags,semester
  });

  res.status(201).json({
    success: true,
    data: newAssignment
  });
});

// Update Assignment
exports.updateAssignment = catchAsyncErrors(async (req, res, next) => {
  const updatedAssignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedAssignment) {
    return next(new ErrorHander('Assignment not found', 404));
  }
  res.status(200).json({
    success: true,
    data: updatedAssignment
  });
});

// Delete Assignment
exports.deleteAssignment = catchAsyncErrors(async (req, res, next) => {
  const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!deletedAssignment) {
    return next(new ErrorHander('Assignment not found', 404));
  }
  res.status(200).json({
    success: true,
    data: deletedAssignment
  });
});

// Get All Assignments
exports.getAllAssignments = catchAsyncErrors(async (req, res, next) => {
  const assignmentList = await Assignment.find();
  res.status(200).json({
    success: true,
    data: assignmentList
  });
});
