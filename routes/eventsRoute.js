const express = require("express")
const router = express.Router()
const {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,getEventByMonths
  } = require("../controllers/eventController");
  const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/events1").post(createEvent).get(getAllEvents)
router.route("/events1/:id").post(getEventByMonths)
router.route("/events1/delete/:id").delete(deleteEvent)
router.route("/events1/update/:id").put(updateEvent)

module.exports =router