const { getUser } = require("../services/auth");

async function restictToLogginedInOnly(req, res, next) {
  try {
    const userUId = req.cookies?.uid;
    if (!userUId) return res.redirect("/login");

    const user = getUser(userUId);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictToLoggedInOnly middleware:", error);
    return res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  try {
    const userUId = req.cookies?.uid;

    const user = getUser(userUId);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictToLoggedInOnly middleware:", error);
    return res.redirect("/login");
  }
}

module.exports = { restictToLogginedInOnly, checkAuth };
