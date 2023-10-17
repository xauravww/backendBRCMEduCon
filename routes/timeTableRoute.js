const express = require("express");
const {
  createTimeTable,
  updateTimeTable,
  deleteTimeTable,
  getAllTimeTables,
  getTimeTableByTeacherId} = require("../controllers/timeTableController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/time-table").get(getAllTimeTables);

router.route("/time-table/:teacherID").get(getTimeTableByTeacherId);


router
.route("/admin/time-table")
.post(
isAuthenticatedUser, authorizeRoles("admin"), 
createTimeTable);

router
  .route("/admin/time-table/:id")
  .put(
    isAuthenticatedUser, authorizeRoles("admin"),
     updateTimeTable)
  .delete(
    isAuthenticatedUser, authorizeRoles("admin"),
     deleteTimeTable);

module.exports = router;
