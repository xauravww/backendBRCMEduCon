const Assignment = require('../model/assignment');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri.js");

// Create Assignment
exports.createAssignment = catchAsyncErrors(async (req, res, next) => {
  submitBy = []
  const {
    title, description, givenDate, dueDate, teacherName, subject, status,
    attachment, feedback, grades, submissionDate,
    lateSubmission, priority, tags, semester, branch } = req.body;

  const newAssignment = await Assignment.create({
    title, description, givenDate, dueDate,
    submitBy, teacherName, subject, status,
    attachment, feedback, grades, submissionDate,
    lateSubmission, priority, tags, semester, branch
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

// update submit Assignment by student
exports.updateAssignmentSubmit = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
  const uploadOptions = {
    resource_type: 'raw', 
    folder: 'uploaded_assignment_pdfs',
    type: 'upload',
  };
  
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content,uploadOptions);
  const assignmentId = req.params.id;
  const { studentName, studentRollNo } = req.body;
  const submission = {
    studentName,
    studentRollNo,
    attachment:{
      public_id:mycloud.public_id,
      url:mycloud.secure_url
    }
  }
  const isRollNoDifferent = await Assignment.findOne({
    _id: assignmentId,
    'submissions.studentRollNo': submission.studentRollNo,
  });

  if (isRollNoDifferent) {
    return next(new ErrorHander('This Roll number already submit the assignment', 400));
  }
  const updatedAssignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    {
      $push: {
        submissions: submission,
      },
    },
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

// Get All Assignments with paticular branch and semester and pending those
exports.getAllAssignmentsWithBranchAndSemester = catchAsyncErrors(async (req, res, next) => {
  const { semester, branch, rollNo } = req.body;
  console.log(req.body)
  const assignmentList = await Assignment.find({
    "semester": semester,
    "branch": branch
  });


  // Remove all other roll numbers from the submissions array
  assignmentList.forEach((assignment) => {
    assignment.submissions = assignment.submissions.filter((submission) => submission.studentRollNo === rollNo);
  });

  // Send the filtered assignment list in the response
  res.status(200).json({
    success: true,
    data: assignmentList
  });
});

