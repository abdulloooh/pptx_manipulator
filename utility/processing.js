const {
  cleanDirectory,
  manipulate,
  getTotalNumberOfSlides,
  createMultipleFiles,
} = require("./utility");

const tempStorage = "cloneFiles";
const resultDirectory = "results";

module.exports = function ([fileName, fileExtension], url) {
  return new Promise(async (resolve, reject) => {
    console.log("inner 1");

    cleanDirectory(resultDirectory, fileExtension);
    getTotalNumberOfSlides(fileName, fileExtension).then((n) => {
      console.log("inner 2");
      createMultipleFiles(tempStorage, fileName, n, fileExtension).then((n) => {
        console.log("inner 3");
        manipulate(n, fileName, fileExtension, url)
          .then((locationArray) => {
            console.log("inner 4");
            cleanDirectory(tempStorage);
            resolve(locationArray);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    });
  });
};
