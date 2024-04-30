const express = require("express");
const singleUpload = require("../middleware/multer.js")
const {
  registerMember,
  loginMember,
  // logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  verifyMember,
  getAllUnverifiedMembers,
  // sample,
} = require("../controllers/memberControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(singleUpload, registerMember);

router.route("/login").post(loginMember);
// router.route("/sample").post(singleUpload, sample);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset").put(resetPassword);

// router.route("/logout").get(logout);

router.route("/me").get(
  isAuthenticatedUser,
  getUserDetails);

router.route("/me").get(
  isAuthenticatedUser,
  getUserDetails);

router.route("/password/update").put(
  isAuthenticatedUser,
  updatePassword);

router.route("/admin/verify").put(
  isAuthenticatedUser,
  verifyMember);

router.route("/admin/me/update").put(
  isAuthenticatedUser,
  singleUpload,
  updateProfile);

router
  .route("/admin/members")
  .get(
    
    isAuthenticatedUser, 
    authorizeRoles("admin","faculty"),
  
  getAllUser);

router
  .route("/admin/members/unverified")
  .post(
    // isAuthenticatedUser, authorizeRoles("admin"),
  getAllUnverifiedMembers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
