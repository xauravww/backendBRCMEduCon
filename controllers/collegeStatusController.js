const CollegeStatus = require('../model/collegeStatus');
// const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create College Status
exports.createCollegeStatus = catchAsyncErrors(async (req, res, next) => {

      const {
        name,rollNo,title,semester,totalFees,
        pendingFees,lateFee,fine,
        bookBank,attendancePercentage
      } = req.body;
  
      const newCollegeStatus = await CollegeStatus.create({
        name,rollNo,title,semester,totalFees,
        pendingFees,lateFee,fine,
        bookBank,attendancePercentage
      });
  
      res.status(201).json({
        success: true,
        data: newCollegeStatus
      });

  });

// Update College Status
exports.updateCollegeStatus = catchAsyncErrors(async (req, res, next) => {
  const updatedCollegeStatus = await CollegeStatus.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedCollegeStatus) {
    return next(new ErrorHandler('College status not found', 404)); // Corrected typo here
  }
  res.status(200).json({
    success: true,
    data: updatedCollegeStatus
  });
});


// Delete College Status
exports.deleteCollegeStatus = catchAsyncErrors(async (req, res, next) => {
    const deletedCollegeStatus = await CollegeStatus.findByIdAndDelete(req.params.id);
    if (!deletedCollegeStatus) {
      return next(new ErrorHandler('College status not found', 404)); // Corrected typo here
    }
    res.status(200).json({
      success: true,
      data: deletedCollegeStatus
    });
  });
  

// Get All College Status
exports.getAllCollegeStatus = catchAsyncErrors(async (req, res, next) => {
  const collegeStatusList = await CollegeStatus.find();
  res.status(200).json({
    success: true,
    data: collegeStatusList
  });
});
