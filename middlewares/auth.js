const { getUser } = require("../services/auth");

async function restictToLogginedInOnly(req, res, next) {
  try {
    // console.log(req);
    const userUId = req.cookies?.uid;
    // console.log("Cookies", req.cookies);
    if (!userUId) return res.redirect("/login");

    const user = getUser(userUId);
    // console.log(user);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictToLoggedInOnly middleware:", error);
    return res.redirect("/login");
  }
}

module.exports = { restictToLogginedInOnly };
