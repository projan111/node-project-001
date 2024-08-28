const { v4: uuidv4 } = require("uuid");
const { LoginUser } = require("../models/userModel");
const { setUser } = require("../services/auth");

async function handleLoginUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    await LoginUser.create({
      name,
      email,
      password,
    });

    console.log("User created");
    return res.redirect("/");
  } catch (error) {
    console.log("Failed to create user:", error);
  }
}

async function handleLoginUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await LoginUser.findOne({
    email,
    password,
  });

  console.log("Success login");
  if (!user) return res.json({ error: "Incorrect Email or Password" });

  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = { handleLoginUserSignup, handleLoginUserLogin };
