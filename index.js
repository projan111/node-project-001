const express = require("express");
const app = express();
const PORT = 8000;
const { dbConnection } = require("./config/db");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dbConnection("mongodb://127.0.0.1:27017/node-project-001");

app.use("/api/users", userRouter);

app.use(logReqRes("log.txt"));

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
