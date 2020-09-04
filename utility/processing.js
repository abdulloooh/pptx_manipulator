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

      let n = await getTotalNumberOfSlides(fileName, fileExtension);
      n = await createMultipleFiles(tempStorage, fileName, n, fileExtension);
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
