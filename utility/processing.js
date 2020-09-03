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
    try {
      cleanDirectory(resultDirectory, fileExtension);

      let n = await getTotalNumberOfSlides(fileName, fileExtension);
      n = await createMultipleFiles(tempStorage, fileName, n, fileExtension);
      const locationArray = await manipulate(n, fileName, fileExtension, url);
      if (locationArray) {
        cleanDirectory(tempStorage);
        resolve(locationArray);
      }
    } catch (ex) {
      throw ex;
    }
  });
};
