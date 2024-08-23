const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    app.use((req, res, next) => {
      fs.appendFile(
        filename,
        `\n ${Date.now()}: ${req.method}: ${req.path}`,
        () => {
          next();
        }
      );
    });
  };
}

module.exports = { logReqRes };
