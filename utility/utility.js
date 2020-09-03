const PPTX = require("nodejs-pptx");
const fs = require("fs");
const path = require("path");
const tempStorage = "cloneFiles";
const resultDirectory = "results";

async function createMultipleFiles(folder, fileName, n, fileExtension) {
  const directory = folder + "/";
  for (let i = 1; i <= n; i++) {
    fs.copyFile(
      fileName + fileExtension,
      directory + fileName + i + fileExtension,
      (err) => {
        if (err) console.log(err.message);
      }
    );
  }
  return n;
}

async function manipulate(n, file, fileExtension) {
  const locationArray = [];

  for (let fileCount = 1; fileCount <= n; fileCount++) {
    let pptx = new PPTX.Composer();
    await pptx.load(`./${tempStorage}/${file}${fileCount}${fileExtension}`);
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
    if (foundSomething) {
      const saveDir = `./${resultDirectory}/${file}${fileCount}${fileExtension}`;
      await pptx.save(`${saveDir}`);
      locationArray.push(saveDir);
    }
  }
  return locationArray;
}

async function getTotalNumberOfSlides(file, fileExtension) {
  //create a garbage copy
  const garbageDir = "./garbage/hold" + fileExtension;
  fs.copyFile(file + fileExtension, garbageDir, (err) => {
    if (err) console.log(err.message);
  });

  //try to remove all files in it
  let pptx = new PPTX.Composer();
  await pptx.load(garbageDir);
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
