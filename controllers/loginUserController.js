const { LoginUser } = require("../models/userModel");

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

  return res.redirect("/");
}

module.exports = { handleLoginUserSignup, handleLoginUserLogin };
