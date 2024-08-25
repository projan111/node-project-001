const express = require("express");
const URL = require("../models/url");

const staticRoute = express.Router();

staticRoute.get("/", async (req, res) => {
  const allUrl = await URL.find({});
  return res.render("home", { urls: allUrl });
});

module.exports = staticRoute;
