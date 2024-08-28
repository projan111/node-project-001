const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const staticRoute = express.Router();

staticRoute.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({});
  return res.render("home", { urls: allUrl });
});

staticRoute.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allUrl = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrl });
});

staticRoute.get("/signup", (req, res) => {
  return res.render("signup");
});
staticRoute.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = staticRoute;
