const express = require("express")
const router = express.Router()
const {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,getEventByMonths
  } = require("../controllers/eventController");
  const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/events1",isAuthenticatedUser).post(createEvent).get(getAllEvents)
router.route("/events1/:id",isAuthenticatedUser).post(getEventByMonths)
router.route("/events1/delete/:id",isAuthenticatedUser,authorizeRoles("admin")).delete(deleteEvent)
router.route("/events1/update/:id",isAuthenticatedUser,authorizeRoles("admin")).put(updateEvent)

module.exports =router