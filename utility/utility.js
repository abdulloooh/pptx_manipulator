const PPTX = require("nodejs-pptx");
const os = require("os");
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
  console.log("inner 3");
  return n;
}

async function manipulate(n, file, fileExtension, urL) {
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
      const filePath = `${file}${fileCount}${fileExtension}`;
      await pptx.save(`./${resultDirectory}/${filePath}`);
      locationArray.push(process.env.BASE_URL + "/" + filePath);
    }
  }
  return locationArray;
}

async function getTotalNumberOfSlides(file, fileExtension) {
  return new Promise((resolve, reject) => {
    //create a garbage copy
    console.log("utility 1");
    const garbageDir = "./garbage/hold" + fileExtension;
    console.log("utility 2");

    //try to remove all files in it
    let pptx = new PPTX.Composer();

    fs.copyFile(file + fileExtension, garbageDir, async (err) => {
      console.log("utility 3");
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }

      pptx
        .load(garbageDir)
        .then(async () => {
          let slideCount = 1;
          while (slideCount) {
            try {
              console.log("utility 4");

              await pptx.compose((pres) => {
                pres.removeSlide(pres.getSlide(slideCount));
                slideCount = slideCount + 1;
              });
            } catch (ex) {
              cleanDirectory("garbage");
              resolve(slideCount - 1);
              break;
            }
          }
        })
        .catch((err) => console.log(err.message));
    });
  });
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
