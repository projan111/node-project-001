const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
  // console.log("User set in map:", id, user);
}

function getUser(id) {
  const user = sessionIdToUserMap.get(id);
  // console.log("Retrieving user with session ID:", id, "User:", user);
  return user;
}
module.exports = { setUser, getUser };
