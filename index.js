const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/node-project-001")
  .then(() => {
    console.log("Mongodb Connected!");
  })
  .catch((err) => {
    console.log("Connection failed!!!");
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

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

app.get("/users", async (req, res) => {
  const getAllUsers = await User.find({});
  const html = `
  <ul>
    ${getAllUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const getAllUsers = await User.find({});
  res.setHeader("X-myName", "Projan Gama");
  res.json(getAllUsers);
});

//Grouping the same routes
app
  .route("/api/users/:uid")
  .get(async (req, res) => {
    const id = req.params.uid;
    const findUsers = await User.findById(id);
    //Search Query for user id in this case
    // const user = users.find((user) => user.id === id);

    if (!findUsers) res.status(404).json({ error: "User not Found!" });

    return res.json(findUsers);
  })
  .patch(async (req, res) => {
    const uid = req.params.uid;

    await User.findByIdAndUpdate(uid, { lastName: "Updated" });
    return res.json({
      status: "Success",
      message: "User updated successfully",
    });

    // const user = users.find((user) => user.id === parseInt(uid));
    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ status: "error", message: "User not found" });
    // }

    // Object.assign(user, updates);

    // fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({
    //     status: "Success",
    //     message: "User updated successfully",
    //     user: user,
    //   });
    // });
  })
  .delete(async (req, res) => {
    const uid = req.params.uid;

    // const user = users.find((user) => user.id === parseInt(uid));
    await User.findByIdAndDelete(uid);

    if (!User) {
      return res.json({ status: "error", message: "No such user exists" });
    }

    // users.splice(user, 1);

    return res.json({
      status: "success",
      message: "User deleted",
    });
  });

app.post("/api/users", async (req, res) => {
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

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("Result:", result);

  res.status(201).json({ message: "User Created" });

  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "Success", id: users.length });
  // });
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
