const express = require('express');
const router = express.Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventByMonths,
} = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/events1').post(isAuthenticatedUser, createEvent).get(isAuthenticatedUser, getAllEvents);
router.route('/events1/:id').get(isAuthenticatedUser, getEventByMonths);
router.route('/events1/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEvent);
router.route('/events1/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateEvent);

module.exports = router;
