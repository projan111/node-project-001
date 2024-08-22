const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");

const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  res.json(users);
});

app.get("/api/users/:uid", (req, res) => {
  const id = Number(req.params.uid);
  //Search Query for user id in this case
  const user = users.find((user) => user.id === id);

  return res.json(user);
});

//Grouping the same routes
app
  .route("/api/users/:uid")
  .get((req, res) => {
    const id = Number(req.params.uid);
    //Search Query for user id in this case
    const user = users.find((user) => user.id === id);

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
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
