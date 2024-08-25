const express = require("express");

const ejsRouter = express.Router();

ejsRouter.get("/", (req, res) => {
  return res.render("home");
});

module.exports = ejsRouter