const express = require("express");
const {
  createAssignment,
  updateAssignment,
  updateAssignmentSubmit,
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsWithBranchAndSemester,
  getAssignmentsToCheckByTeacherId,
  updateAssignmentSubmission,
} = require("../controllers/assignmenController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

router.route("/faculty/assignment").post(
  isAuthenticatedUser, authorizeRoles("admin", "faculty"),
  createAssignment);

router.route("/faculty/update/submission").post(
  isAuthenticatedUser, authorizeRoles("admin", "faculty"),
  updateAssignmentSubmission);

router.route("/submit/assignment/:id").put(singleUpload,
  isAuthenticatedUser, authorizeRoles("admin", "faculty", "student"),
  updateAssignmentSubmit);

router
  .route("/faculty/assignment")
  .get(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllAssignments);

router
  .route("/assignment")
  .post(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllAssignmentsWithBranchAndSemester);

router
  .route("/assignments/check")
  .post(
    // isAuthenticatedUser, authorizeRoles("admin", "faculty"), 
    getAssignmentsToCheckByTeacherId);

router
  .route("/faculty/assignment/:id")
  .put(
    isAuthenticatedUser, authorizeRoles("admin", "faculty"),
    updateAssignment)
  .delete(
    isAuthenticatedUser, authorizeRoles("admin", "faculty"),
    deleteAssignment);

module.exports = router;
