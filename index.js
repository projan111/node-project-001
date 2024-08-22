const express = require("express");
const app = express();
const PORT = 8000;

const users = require("./MOCK_DATA.json");

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
  .post((req, res) => {})
  .delete((req, res) => {});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
