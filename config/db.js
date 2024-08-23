const mongoose = require("mongoose");

async function dbConnection(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongodb Connected!");
    })
    .catch((err) => {
      console.log("Connection failed!!!");
    });
}

module.exports = { dbConnection };
