const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortId = shortid();

    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    return res.render("home", { id: shortId });
  } catch (error) {
    console.log("something is going wrong here", error);
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totleClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
