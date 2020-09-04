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
    try {
      cleanDirectory(resultDirectory, fileExtension);
      console.log("inner 2");
      let n = await getTotalNumberOfSlides(fileName, fileExtension);
      console.log("inner 3");
      n = await createMultipleFiles(tempStorage, fileName, n, fileExtension);
      console.log("inner 4");
      const locationArray = await manipulate(n, fileName, fileExtension, url);
      if (locationArray) {
        cleanDirectory(tempStorage);
        resolve(locationArray);
      }
      console.log("inner 5");
    } catch (ex) {
      throw ex;
    }
  });
};
