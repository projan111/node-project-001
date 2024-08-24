const express = require("express");
const router = express.Router();
const {
  handleAllrequest,
  handleUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleCreateNewUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(handleAllrequest)
  .post(handleCreateNewUser);

//Grouping the same routes
router
  .route("/:uid")
  .get(handleUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);
  
module.exports = router;
