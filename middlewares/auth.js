const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  const authorizationHeaderValue = req.headers["authorization"];

  req.user = null;

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Un Authorized");

    return next();
  };
};

// async function restictToLogginedInOnly(req, res, next) {
//   try {
//     // const userUId = req.cookies?.uid;
//     const userUId = req.headers["authorization"];
//     if (!userUId) return res.redirect("/login");

//     const token = userUId.split("Bearer ")[1];

//     const user = getUser(token);

//     if (!user) return res.redirect("/login");

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in restrictToLoggedInOnly middleware:", error);
//     return res.redirect("/login");
//   }
// }

// async function checkAuth(req, res, next) {
//   try {
//     // const userUId = req.cookies?.uid;
//     const userUId = req.headers["authorization"];
//     const token = userUId.split("Bearer ")[1];

//     const user = getUser(token);

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in restrictToLoggedInOnly middleware:", error);
//     return res.redirect("/login");
//   }
// }

module.exports = { checkForAuthentication, restrictTo };
