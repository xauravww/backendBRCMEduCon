const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents
} = require("../controllers/eventController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/events").get(getAllEvents);

router
.route("/admin/event")
.post(
// isAuthenticatedUser, authorizeRoles("admin"), 
createEvent);

router
  .route("/admin/event/:id")
  .put(
    // isAuthenticatedUser, authorizeRoles("admin"),
     updateEvent)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin"),
     deleteEvent);

module.exports = router;
