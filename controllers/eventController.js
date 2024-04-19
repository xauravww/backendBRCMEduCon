const Event = require('../model/event');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    const {
      name,description,date,time,assignTo,eventType,monthCode
    } = req.body;
  
    const newEvent = await Event.create({
      name,description,date,time,assignTo,eventType,monthCode
    });
  
    res.status(201).json({
      success: true,
      data: newEvent
    });
  });

  exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.id;
  
    const deletedEvent = await Event.findByIdAndDelete(eventId);
  
    if (!deletedEvent) {
      return next(new ErrorHander('Event not found', 404));
    }
  
    res.status(200).json({
      success: true,
      data: deletedEvent
    });
  });
  
  exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.id;
    const {
      name,description,date,time,assignTo,eventType,monthCode
    } = req.body;
  
  
    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      name,description,date,time,assignTo,eventType,monthCode
    }, { new: true, runValidators: true });
  
    if (!updatedEvent) {
      return next(new ErrorHander('Event not found', 404));
    }
  
    res.status(200).json({
      success: true,
      data: updatedEvent
    });
  });

exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find();
  
    res.status(200).json({
      success: true,
      data: events
    });
  });
exports.getEventByMonths = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const events = await Event.find({monthCode:id});
    res.status(200).json({
      success: true,
      data: events
    });
  });

