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

router.route("/faculty/attendance").post(
  // isAuthenticatedUser, authorizeRoles("admin","faculty"),
  createAttendance);

router.route("/faculty/attendance/unique").post(
  // isAuthenticatedUser, authorizeRoles("admin","faculty"),
  getUniqueAttendance);


// get monthly attendance using branch, sem , subject and  roll number
router.route("/student/attendance").post(getMonthlyStudentAttendance)


// to get students For Attendance of a paticular Branch and Semester

router.route("/faculty/attendance/students").get(getStudentsForAttendance);

router
  .route("/faculty/attendance")
  .get(
    // isAuthenticatedUser,
    // authorizeRoles("admin", "faculty"),
    getAllAttendance);

router.route("/faculty/attendance/update").put(
    // isAuthenticatedUser, 
    // authorizeRoles("admin","faculty"),
    updateAttendance);

router
  .route("/faculty/attendance/:id")
  // .put(
  // isAuthenticatedUser, authorizeRoles("admin","faculty"),
  //  updateAttendance)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin", "faculty"),
    deleteAttendance);

module.exports = router;
