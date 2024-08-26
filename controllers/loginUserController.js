const { v4: uuidv4 } = require("uuid");
const { LoginUser } = require("../models/userModel");
const { setUser } = require("../services/auth");

async function handleLoginUserSignup(req, res) {
  const { name, email, password } = req.body;

  await LoginUser.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
  // return res.json({ status: "Success", msg: "User Created", data: data });
}

async function handleLoginUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await LoginUser.findOne({
    email,
    password,
  });

  if (!user) return res.json({ error: "Incorrect Email or Password" });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = { handleLoginUserSignup, handleLoginUserLogin };
