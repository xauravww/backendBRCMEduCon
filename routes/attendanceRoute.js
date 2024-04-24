const express = require("express");
const {
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAllAttendance,
  getStudentsForAttendance,
  getUniqueAttendance,
  getMonthlyStudentAttendance
} = require("../controllers/attendanceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Create Attendance
router.route("/faculty/attendance")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "faculty"),
    createAttendance
  )
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "faculty"),
    getAllAttendance
  );

// Get Unique Attendance
router.route("/faculty/attendance/unique")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "faculty"),
    getUniqueAttendance
  );

// Get Monthly Student Attendance
router.route("/student/attendance")
  .post(
    isAuthenticatedUser,
    getMonthlyStudentAttendance
  );

// Get Students For Attendance
router.route("/faculty/attendance/students")
  .get(
    isAuthenticatedUser,
    getStudentsForAttendance
  );

// Update Attendance
router.route("/faculty/attendance/update")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "faculty"),
    updateAttendance
  );

// Delete Attendance
router.route("/faculty/attendance/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "faculty"),
    deleteAttendance
  );

module.exports = router;
