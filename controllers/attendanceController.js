const Attendance = require("../model/attendnace");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createAttendance = catchAsyncErrors(async (req, res, next) => {
    const {
      memberId,
      date,
      status,
      remarks
    } = req.body;
  
    // Creating attendance record
    const attendanceRecord = await Attendance.create({
      memberId,
      date,
      status,
      remarks
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
    const attendanceId = req.params.id;
  
    const {
      memberId,
      date,
      status,
      remarks
    } = req.body;
  
    const updatedRecord = await Attendance.findByIdAndUpdate(attendanceId, {
      memberId,
      date,
      status,
      remarks
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
  
    