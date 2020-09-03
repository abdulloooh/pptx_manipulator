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

getTotalNumberOfSlides().then((n) => {
  createMultipleFiles(tempStorage, file, n)
    .then((n) =>
      manipulate(n).then(() => {
        console.log("done");
        cleanDirectory(tempStorage);
      })
    )
    .catch((err) => {
      console.log("error:", err.message);
    });
});
