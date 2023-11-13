const express = require("express");
const {
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/faculty/attendance").post(isAuthenticatedUser, authorizeRoles("admin","faculty"),createAttendance);

router
  .route("/faculty/attendance")
  .get(
    isAuthenticatedUser, authorizeRoles("admin","faculty"), 
    getAllAttendance);

router
  .route("/faculty/attendance/:id")
  .put(
    isAuthenticatedUser, authorizeRoles("admin","faculty"),
     updateAttendance)
  .delete(
    isAuthenticatedUser, authorizeRoles("admin","faculty"),
     deleteAttendance);

module.exports = router;
