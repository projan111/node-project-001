const express = require("express");
const app = express();
const PORT = 8000;
const { dbConnection } = require("./config/db");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/userRoute");
const urlRouter = require("./routes/urlRoute");
const URL = require("./models/url");
const path = require("path");

// Middlewares ---------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dbConnection("mongodb://127.0.0.1:27017/node-project-001");

// EJS Template Engines ------------------------------------
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
  const urlShort = await URL.find({});
  return res.render("home", {
    urls: urlShort,
  });
});

// Routes --------------------------------------------------
app.use("/api/users", userRouter);
app.use("/url", urlRouter);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

// Logs --------------------------------------------------------------
app.use(logReqRes("log.txt"));

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
