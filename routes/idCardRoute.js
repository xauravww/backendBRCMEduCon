const express = require("express");
const {
  createIDCard,
  updateIDCard,
  deleteIDCard,
  getAllIDCards,
 getIDCardByRollNo
} = require("../controllers/idCardController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/student/id-card/:rollNo").get(getIDCardByRollNo);

router
.route("/admin/id-card")
.post(
// isAuthenticatedUser, authorizeRoles("admin"), 
createIDCard);

router
  .route("/admin/id-card")
  .get(
    // isAuthenticatedUser, authorizeRoles("admin"), 
    getAllIDCards);

router
  .route("/admin/id-card/:id")
  .put(
    // isAuthenticatedUser, authorizeRoles("admin"),
     updateIDCard)
  .delete(
    // isAuthenticatedUser, authorizeRoles("admin"),
     deleteIDCard);

module.exports = router;
