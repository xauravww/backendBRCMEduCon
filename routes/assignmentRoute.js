const express = require("express");
const {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
} = require("../controllers/assignmenController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/faculty/assignment").post(
      isAuthenticatedUser, authorizeRoles("admin"), 
createAssignment);

router
  .route("/faculty/assignment")
  .get(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllAssignments);

router
  .route("/faculty/assignment/:id")
  .put(
    isAuthenticatedUser, authorizeRoles("admin"),
     updateAssignment)
  .delete(
    isAuthenticatedUser, authorizeRoles("admin"),
     deleteAssignment);

module.exports = router;
