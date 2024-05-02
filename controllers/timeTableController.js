const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Timetable = require('../model/timeTable'); // Updated import statement

// Create an event in the timetable
exports.addEvent = catchAsyncErrors(async (req, res, next) => {
    const {
        id,
        title,
        start,
        end,
        color,
        sem,
        branch,
        facultyId,
        facultyName,
        subject
    } = req.body;

    try {
        // Check if there's already an event with the same subject and overlapping start or end dates
        const existingEvent = await Timetable.findOne({
            subject: subject,branch:branch,
            $or: [
                { start: { $lte: start }, end: { $gte: start } }, // Check for overlap with start date
                { start: { $lte: end }, end: { $gte: end } },     // Check for overlap with end date
                { start: { $gte: start }, end: { $lte: end } }    // Check for containment within existing event
            ]
        });

        if (existingEvent) {
            return next(new ErrorHander('Duplicate event: There is already an event for the same subject with overlapping dates.', 400));
        }

        const event = {
            id,
            title,
            start,
            end,
            color,
            sem,
            branch,
           facultyName,facultyId,
            subject
        };

        const createdEvent = await Timetable.create(event);

        res.status(201).json({
            success: true,
            data: createdEvent
        });
    } catch (error) {
        return next(new ErrorHander(error.message, 400));
    }
});


// Delete an event from the timetable
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const timetable = await Timetable.findOneAndDelete(
        { _id: req.params.eventId },
       
    );

    if (!timetable) {
        return next(new ErrorHander('Timetable not found', 404));
    }

    res.status(200).json({
        success: true,
        data: timetable
    });
});
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.eventId; // Destructure event ID
    const updatedEvent = req.body;
  
    try {
      const updatedEventDocument = await Event.findByIdAndUpdate(
        eventId, // Find the event by ID
        updatedEvent, // Update the entire event document with new data
      );
  
      if (!updatedEventDocument) {
        return next(new ErrorHander('Event not found', 404));
      }
  
      res.status(200).json({
        success: true,
        data: updatedEventDocument
      });
    } catch (error) {
      return next(new ErrorHander(error.message, 400));
    }
  });
  


// Get events by faculty ID
exports.getEventsByFacultyId = catchAsyncErrors(async (req, res, next) => {
    const facultyId = req.params.facultyId;

    const timetables = await Timetable.find({facultyId });

    res.status(200).json({
        success: true,
        data: timetables
    });
});

// Get events by branch and semester
exports.getEventsByBranchAndSemester = catchAsyncErrors(async (req, res, next) => {
    const branch = req.params.branch;
    const semester = req.params.semester;

    const timetables = await Timetable.find({ "branch": branch, "sem": semester });

    res.status(200).json({
        success: true,
        data: timetables
    });
});
