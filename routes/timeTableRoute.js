const express = require('express');
const router = express.Router();
const { addEvent, deleteEvent, updateEvent, getEventsByFacultyId, getEventsByBranchAndSemester } = require('../controllers/timeTableController');

// Route to add an event
router.post('/tt/add', addEvent);

// Route to delete an event by event ID
router.delete('/tt/delete/:eventId', deleteEvent);

// Route to update an event by event ID
router.put('/tt/update/:eventId', updateEvent);

// Route to get events by faculty ID
router.get('/tt/faculty/:facultyId', getEventsByFacultyId);

// Route to get events by branch and semester
router.get('/tt/:branch/:semester', getEventsByBranchAndSemester);





module.exports = router;
