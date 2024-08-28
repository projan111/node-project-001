const express = require("express");
const app = express();
const PORT = 8000;
const { dbConnection } = require("./config/db");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/userRoute");
const urlRouter = require("./routes/urlRoute");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const signupRouter = require("./routes/loginUserRoute");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

// EJS Template Engines ------------------------------------
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares ---------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);
dbConnection("mongodb://127.0.0.1:27017/node-project-001");

// Routes --------------------------------------------------
app.use("/signup", signupRouter);
app.use("/api/users", userRouter);

app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/", staticRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  // console.log("Received shortId:", shortId);
  // Redirect url to the generated real website
  try {
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
      },
      {
        new: true,
      }
    );
    if (!entry) {
      // Handle the case where the shortId was not found
      return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error finding and updating URL:", error);
    res.status(500).send("An error occurred");
  }
});

// Logs --------------------------------------------------------------
app.use(logReqRes("log.txt"));

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
