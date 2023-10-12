const express = require("express");
const {
  createCollegeStatus,
  updateCollegeStatus,
  deleteCollegeStatus,
  getAllCollegeStatus,
} = require("../controllers/collegeStatusController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/status").post(createCollegeStatus);

router
  .route("/admin/status")
  .get(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllCollegeStatus);

router
  .route("/admin/status/:id")
  .put(
    // isAuthenticatedUser, authorizeRoles("admin"),
     updateCollegeStatus)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin"),
     deleteCollegeStatus);

module.exports = router;
