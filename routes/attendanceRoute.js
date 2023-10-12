const express = require("express");
const {
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("faculty/attendance").post(createAttendance);

router
  .route("/faculty/attendance")
  .get(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllAttendance);

router
  .route("/faculty/attendance/:id")
  .put(
    // isAuthenticatedUser, authorizeRoles("admin"),
     updateAttendance)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin"),
     deleteAttendance);

module.exports = router;
