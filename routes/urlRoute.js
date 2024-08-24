const express = require("express");
const urlRouter = express.Router();

const { handleGenerateNewShortURL } = require("../controllers/urlController");

urlRouter.post("/", handleGenerateNewShortURL);

module.exports = urlRouter