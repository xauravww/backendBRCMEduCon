const TimeTable = require('../model/timeTable');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a TimeTable
exports.createTimeTable = catchAsyncErrors(async (req, res, next) => {
    const {
        teacherID,
        teacherName,
        day,
        classCoordinator,
        subjects
    } = req.body;

    const newTimeTable = await TimeTable.create({
        teacherID,
        teacherName,
        day,
        classCoordinator,
        subjects
    });

    res.status(201).json({
        success: true,
        data: newTimeTable
    });
});

// Get all TimeTables
exports.getAllTimeTables = catchAsyncErrors(async (req, res, next) => {
    const timeTables = await TimeTable.find();
    res.status(200).json({
        success: true,
        data: timeTables
    });
});

// Get a single TimeTable by Teacher ID
exports.getTimeTableByTeacherId = catchAsyncErrors(async (req, res, next) => {
    const teacherID = req.params.teacherID;

    const timeTable = await TimeTable.findOne({ teacherID });

    if (!timeTable) {
        return next(new ErrorHander(`TimeTable not found for teacher with ID: ${teacherID}`, 404));
    }

    res.status(200).json({
        success: true,
        data: timeTable
    });
});


// Update a TimeTable
exports.updateTimeTable = catchAsyncErrors(async (req, res, next) => {
    const updatedTimeTable = await TimeTable.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedTimeTable) {
        return next(new ErrorHander('TimeTable not found', 404));
    }
    res.status(200).json({
        success: true,
        data: updatedTimeTable
    });
});

// Delete a TimeTable
exports.deleteTimeTable = catchAsyncErrors(async (req, res, next) => {
    const deletedTimeTable = await TimeTable.findByIdAndDelete(req.params.id);
    if (!deletedTimeTable) {
        return next(new ErrorHander('TimeTable not found', 404));
    }
    res.status(200).json({
        success: true,
        data: deletedTimeTable
    });
});
