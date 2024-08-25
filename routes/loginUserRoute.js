const express = require("express");
const {
  handleLoginUserSignup,
  handleLoginUserLogin,
} = require("../controllers/loginUserController");

const signupRouter = express.Router();

signupRouter.post("/", handleLoginUserSignup);
signupRouter.post("/login", handleLoginUserLogin);

module.exports = signupRouter;
