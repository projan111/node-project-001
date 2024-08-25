const { LoginUser } = require("../models/userModel");

async function handleLoginUserSignup(req, res) {
  const { name, email, password } = req.body;

  await LoginUser.create({
    name,
    email,
    password,
  });

  return res.render("home");
  // return res.json({ status: "Success", msg: "User Created", data: data });
}

module.exports = { handleLoginUserSignup };
