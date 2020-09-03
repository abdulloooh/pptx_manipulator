const {
  cleanDirectory,
  manipulate,
  getTotalNumberOfSlides,
  createMultipleFiles,
} = require("./utility");

const tempStorage = "cloneFiles";
const resultDirectory = "results";

module.exports = function (file, req, res) {
  console.log(file);
  res.write("File uploaded and moved!");
  res.end();

  //clean result directory
  cleanDirectory(resultDirectory);

  getTotalNumberOfSlides(file).then((n) => {
    createMultipleFiles(tempStorage, file, n)
      .then((n) =>
        manipulate(n, file).then(() => {
          console.log("done");
          cleanDirectory(tempStorage);
        })
      )
      .catch((err) => {
        console.log("error:", err.message);
      });
  });
  res.write("File uploaded and moved!");
  res.end();
};
