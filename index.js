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

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
