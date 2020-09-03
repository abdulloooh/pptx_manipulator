require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
