const {
  cleanDirectory,
  manipulate,
  getTotalNumberOfSlides,
  createMultipleFiles,
} = require("./utility");

const tempStorage = "cloneFiles";
const resultDirectory = "results";

module.exports = function ([fileName, fileExtension]) {
  cleanDirectory(resultDirectory, fileExtension);

  getTotalNumberOfSlides(fileName, fileExtension).then((n) => {
    createMultipleFiles(tempStorage, fileName, n, fileExtension)
      .then((n) =>
        manipulate(n, fileName, fileExtension).then(() => {
          console.log("done");
          cleanDirectory(tempStorage);
        })
      )
      .catch((err) => {
        console.log("error:", err.message);
      });
  });
};
