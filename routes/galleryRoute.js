const express = require("express");
const {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
  getAllGalleryImages
} = require("../controllers/galleryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/gallery").get(getAllGalleryImages);

router
.route("/admin/gallery")
.post(
// isAuthenticatedUser, authorizeRoles("admin"), 
createGalleryImage);

router
  .route("/admin/gallery/:id")
  .put(
    // isAuthenticatedUser, authorizeRoles("admin"),
     updateGalleryImage)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin"),
     deleteGalleryImage);

module.exports = router;
