const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const path = require("path");

const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((req, res, next) => {
//   fs.appendFile(
//     "log.txt",
//     `\n ${Date.now()}: ${req.method}: ${req.path}`,
//     () => {
//       next();
//     }
//   );
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Projan Gama");
  res.json(users);
});

//Grouping the same routes
app
  .route("/api/users/:uid")
  .get((req, res) => {
    const id = Number(req.params.uid);
    //Search Query for user id in this case
    const user = users.find((user) => user.id === id);

    if (!user) res.status(404).json({ error: "User not Found!" });

    return res.json(user);
  })
  .patch((req, res) => {
    const uid = req.params.uid;
    const updates = req.body;

    const user = users.find((user) => user.id === parseInt(uid));
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    Object.assign(user, updates);

    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({
        status: "Success",
        message: "User updated successfully",
        user: user,
      });
    });
  })
  .delete((req, res) => {
    const uid = req.params.uid;

    const user = users.find((user) => user.id === parseInt(uid));

    if (!user) {
      return res.json({ status: "error", message: "No such user exists" });
    }

    users.splice(user, 1);

    return res.json({
      status: "success",
      message: "User deleted",
      id: uid,
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  users.push({ id: users.length + 1, ...body });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
