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
    cleanDirectory(resultDirectory, fileExtension);

    getTotalNumberOfSlides(fileName, fileExtension).then((n) => {
      createMultipleFiles(tempStorage, fileName, n, fileExtension).then((n) => {
        manipulate(n, fileName, fileExtension, url)
          .then((locationArray) => {
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
