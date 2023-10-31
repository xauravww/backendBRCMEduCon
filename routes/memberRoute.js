const express = require("express");
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
  verifyUser,
} = require("../controllers/memberControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads") // Define where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Define the file name
  },
});

const upload = multer({ storage: storage });


const router = express.Router();

router.route("/register").post(upload.single('photo'), registerMember);
 
router.route("/login").post(loginMember);


// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

// router.route("/logout").get(logout);

router.route("/me").get(
  isAuthenticatedUser,
   getUserDetails);

router.route("/password/update").put(
  isAuthenticatedUser,
   updatePassword);

router.route("/admin/verify").put(
  isAuthenticatedUser,
   verifyUser);

router.route("/admin/me/update").put(
  isAuthenticatedUser,
   updateProfile);

router
  .route("/admin/members")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
