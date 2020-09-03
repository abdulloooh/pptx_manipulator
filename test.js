const {
  cleanDirectory,
  manipulate,
  getTotalNumberOfSlides,
  createMultipleFiles,
} = require("./utility");

const tempStorage = "cloneFiles";
const resultDirectory = "results";
let file = "Biochem";

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
