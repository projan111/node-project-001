const express = require("express");
const urlRouter = express.Router();

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/urlController");

urlRouter.post("/", handleGenerateNewShortURL);

urlRouter.get("/analytics/:shortId", handleGetAnalytics);

module.exports = urlRouter;
  