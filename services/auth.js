const jwt = require("jsonwebtoken");
// const sessionIdToUserMap = new Map();
const secretKey = "RojanProjan$kajdfaslajhbdfabdfakf5121516";

function setUser(user) {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      secretKey
    );
  } catch (error) {
    console.log("Error is here:", error);
  }

  // sessionIdToUserMap.set(id, user);
  // console.log("User set in map:", id, user);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
    // const user = sessionIdToUserMap.get(id);
    // console.log("Retrieving user with session ID:", id, "User:", user);
    // return user;
  } catch (error) {
    return console.log("Error while login:", error);
  }
}
module.exports = { setUser, getUser };
