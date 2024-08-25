const express = require("express");
const { handleLoginUserSignup } = require("../controllers/loginUserController");

const signupRouter = express.Router();

signupRouter.post("/", handleLoginUserSignup);

module.exports = signupRouter;
