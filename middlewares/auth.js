const { getUser } = require("../services/auth");

async function restictToLogginedInOnly(req, res, next) {
  const userUId = req.cookies?.uid;

  if (!userUId) return res.redirect("/login");
  const user = getUser(userUId);

  if (!user) return res.redirect("/login");
  
  req.user = user;
  next();
}

module.exports = { restictToLogginedInOnly };
