const Assignment = require('../model/assignment');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const getDataUri = require("../utils/dataUri.js");

// Create Assignment
exports.createAssignment = catchAsyncErrors(async (req, res, next) => {
  submissions = []
  const {
    title, description, givenDate, dueDate, teacherName, teacherId, subject, status,
    attachment, feedback, grades, submissionDate,
    lateSubmission, priority, tags, semester, branch } = req.body;

  const newAssignment = await Assignment.create({
    title, description, givenDate, dueDate,
    submissions, teacherName, teacherId, subject, status,
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

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, uploadOptions);
  const assignmentId = req.params.id;
  const { studentName, studentRollNo } = req.body;
  const submission = {
    studentName,
    studentRollNo,
    attachment: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url
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


  // Remove all other roll numbers from the submissions array because a student get the  assignments not the other student submissions 
  assignmentList.forEach((assignment) => {
    assignment.submissions = assignment.submissions.filter((submission) => submission.studentRollNo === rollNo);
  });

  // Send the filtered assignment list in the response
  res.status(200).json({
    success: true,
    data: assignmentList
  });
});

// Get Assignments with paticular teacher id to twacher can check  
exports.getAssignmentsToCheckByTeacherId = catchAsyncErrors(async (req, res, next) => {
  // here rollNo is id of that teacher
  const { rollNo } = req.body;
  console.log(req.body)
  const assignmentList = await Assignment.find({
    "teacherId": rollNo
  });


  // Send the filtered assignment list in the response
  res.status(200).json({
    success: true,
    data: assignmentList
  });
});

//update submission
exports.updateAssignmentSubmission = catchAsyncErrors(async (req, res, next) => {
  const { id, studentName, studentRollNo, isChecked } = req.body;
  console.log(req.body)
   // Validate that 'id', 'name', and 'rollNo' are present in the request body
  if (!id || !studentName || !studentRollNo || isChecked === undefined ) {
  
    return next(new ErrorHander('Missing required fields (id, studentName, studentRollNo,isChecked', 400));

  }

  // Find the assignment by id
  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return next(new ErrorHander('Assignment not found', 404));
 
  }

  // Find the submission in the 'submissions' array based on 'rollNo'
  const submissionIndex = assignment.submissions.findIndex(
    (submission) => submission.studentRollNo === studentRollNo
  );

  if (submissionIndex === -1) {

    return next(new ErrorHander('Submission not found for the given rollNo', 404));

  }

  // Update the submission at the found index
  assignment.submissions[submissionIndex].isChecked = isChecked;

  // Save the updated assignment
  await assignment.save();
 
  res.status(200).json({
    success: true,
    data: assignment,
  });
});


