const Attendance = require("../model/attendnace");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Member = require("../model/login");
const moment = require("moment");

exports.createAttendance = catchAsyncErrors(async (req, res, next) => {
  const {
    attendanceData,
    date,
    semester,
    branch,
    subject
  } = req.body;
  console.log(req.body);
  const givenDate = new Date(date);

  // Get today's date
  const today = new Date();

  // Compare the given date with today's date
  if (givenDate > today) {
    return next(new ErrorHander('Invalid date. Attendance date cannot be greater than today.', 400));

  
  }

  const existingAttendance = await Attendance.findOne({
    date,
    branch,
    semester,
    subject
  });

  if (existingAttendance) {
    return next(new ErrorHander('Duplicate entry. Attendance record already exists for this date, branch, and semester.', 400));

  }
  // Creating attendance record
  const attendanceRecord = await Attendance.create({
    attendanceData,
    date,
    branch,
    semester,
    subject
  });

  // Send response with the created attendance record
  res.status(201).json({
    success: true,
    data: attendanceRecord,
  });
});

//delete the attendace
exports.deleteAttendance = catchAsyncErrors(async (req, res, next) => {
  const attendanceId = req.params.id;

  const deletedRecord = await Attendance.findByIdAndDelete(attendanceId);

  if (!deletedRecord) {
    return next(new ErrorHander('Attendance record not found', 404));
  }

  res.status(200).json({
    success: true,
    data: deletedRecord,
  });
});

//update the attendace
exports.updateAttendance = catchAsyncErrors(async (req, res, next) => {
  const attendanceId = req.body.id;

  const {
    attendanceData,
    date,
    semester,
    branch,
    subject
  } = req.body;
  console.log(req.body);

  const updatedRecord = await Attendance.findByIdAndUpdate(attendanceId, {
    attendanceData,
    date,
    branch,
    semester,
    subject
  }, { new: true, runValidators: true });

  if (!updatedRecord) {
    return next(new ErrorHander('Attendance record not found', 404));
  }

  res.status(200).json({
    success: true,
    data: updatedRecord,
  });
});


// get all attendance
exports.getAllAttendance = catchAsyncErrors(async (req, res, next) => {
  const attendanceRecords = await Attendance.find();

  res.status(200).json({
    success: true,
    data: attendanceRecords,
  });
});
// get all attendance
exports.getUniqueAttendance = catchAsyncErrors(async (req, res, next) => {
  const { date, semester, branch } = req.body;
  console.log(req.body)
  const formattedDate = moment(date).format('YYYY-MM-DD');
  console.log(formattedDate)

  // Assuming your Attendance model has fields date, sem, and branch
  const attendanceRecords = await Attendance.find({
    date: formattedDate,
    branch: branch,
    semester: semester,
  });

  res.status(200).json({
    success: true,
    data: attendanceRecords,
  });
});

//get Students for Attendance
exports.getStudentsForAttendance = catchAsyncErrors(async (req, res, next) => {
  const { semester, branch } = req.body
  const studentList = await Member.find({
    "semester": req.body.semester,
    "branch": req.body.branch
  });

  // Extracting only name and rollNo from each member's data
  const simplifiedStudentList = studentList.map(({ _id, name, rollno, imageurl }) => ({ _id, name, rollno, imageurl }));
  res.status(200).json({
    success: true,
    data: simplifiedStudentList,
  });
});