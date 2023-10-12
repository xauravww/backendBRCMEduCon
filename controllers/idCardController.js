const IDCard = require('../model/idCard');
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create ID Card
exports.createIDCard = catchAsyncErrors(async (req, res, next) => {
  const {
    name,rollno,mobileNo,
    email,address,age,
    batchYear,dob,
    registrationNo
  } = req.body;

  const newIDCard = await IDCard.create({
    name,rollno,mobileNo,
    email,address,age,
    batchYear,dob,
    registrationNo
  });

  res.status(201).json({
    success: true,
    data: newIDCard
  });
});

// Update ID Card
exports.updateIDCard = catchAsyncErrors(async (req, res, next) => {
  const updatedIDCard = await IDCard.findByIdAndUpdate(
    req.params.id,
    req.body,
    // { new: true, runValidators: true }
  );
  if (!updatedIDCard) {
    return next(new ErrorHandler('ID Card not found', 404));
  }
  res.status(200).json({
    success: true,
    data: updatedIDCard
  });
});

// Delete ID Card
exports.deleteIDCard = catchAsyncErrors(async (req, res, next) => {
  const deletedIDCard = await IDCard.findByIdAndDelete(req.params.id);
  if (!deletedIDCard) {
    return next(new ErrorHandler('ID Card not found', 404));
  }
  res.status(200).json({
    success: true,
    data: deletedIDCard
  });
});

// Get All ID Cards
exports.getAllIDCards = catchAsyncErrors(async (req, res, next) => {
  const idCardList = await IDCard.find();
  res.status(200).json({
    success: true,
    data: idCardList
  });
});


//get the roll no by their roll no
exports.getIDCardByRollNo = catchAsyncErrors(async (req, res, next) => {
    const rollNo = req.params.rollNo; // Assuming the roll number is in the URL params
  
    const idCard = await IDCard.findOne({ rollno: rollNo });
  
    if (!idCard) {
      return res.status(404).json({
        success: false,
        message: 'ID card not found for the given roll number.'
      });
    }
  
    res.status(200).json({
      success: true,
      data: idCard
    });
  });