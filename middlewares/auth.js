const { getUser } = require("../services/auth");

async function restictToLogginedInOnly(req, res, next) {
  try {
    // const userUId = req.cookies?.uid;
    const userUId = req.headers["authorization"];
    if (!userUId) return res.redirect("/login");

    const token = userUId.split("Bearer ")[1]

    const user = getUser(token);

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
    // const userUId = req.cookies?.uid;
    const userUId = req.headers["authorization"];
    const token = userUId.split("Bearer ")[1];

    const user = getUser(token);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictToLoggedInOnly middleware:", error);
    return res.redirect("/login");
  }
}

module.exports = { restictToLogginedInOnly, checkAuth };
