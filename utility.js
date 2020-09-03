const PPTX = require("nodejs-pptx");
const fs = require("fs");
const path = require("path");
let file = "Biochem";
const tempStorage = "cloneFiles";
const resultDirectory = "results";

async function createMultipleFiles(folder, fileName, n) {
  const directory = folder + "/";
  for (let i = 1; i <= n; i++) {
    fs.copyFile(
      fileName + ".pptx",
      directory + fileName + i + ".pptx",
      (err) => {
        if (err) console.log(err.message);
      }
    );
  }
  return n;
}

async function manipulate(n) {
  for (let fileCount = 1; fileCount <= n; fileCount++) {
    let pptx = new PPTX.Composer();
    await pptx.load(`./${tempStorage}/${file}${fileCount}.pptx`);
    let slideCount = 1,
      foundSomething = false;
    while (slideCount) {
      if (slideCount === fileCount) {
        slideCount = slideCount + 1;
        foundSomething = true;
        continue;
      }
      try {
        await pptx.compose((pres) => {
          pres.removeSlide(pres.getSlide(slideCount));
        });
      } catch (ex) {
        break; //when total slide no has been reached
      }
      slideCount = slideCount + 1;
    }
    if (foundSomething)
      await pptx.save(`./${resultDirectory}/${file}${fileCount}.pptx`);
  }
}

async function getTotalNumberOfSlides() {
  //create a garbage copy
  fs.copyFile(file + ".pptx", "./garbage/hold.pptx", (err) => {
    if (err) console.log(err.message);
  });

  //try to remove all files in it
  let pptx = new PPTX.Composer();
  await pptx.load("./garbage/hold.pptx");
  let slideCount = 1;
  while (slideCount) {
    try {
      await pptx.compose((pres) => {
        pres.removeSlide(pres.getSlide(slideCount));
      });
    } catch (ex) {
      cleanDirectory("garbage");
      return slideCount - 1;
    }
    slideCount = slideCount + 1;
  }
}

function cleanDirectory(directory) {
  //clean temp storage directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      //do nth
    }
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) {
          //do nth
        }
      });
    }
  });
}

module.exports = {
  cleanDirectory,
  manipulate,
  getTotalNumberOfSlides,
  createMultipleFiles,
};
