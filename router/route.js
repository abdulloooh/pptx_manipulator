const formidable = require("formidable");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const processing = require("../utility/processing");

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

router.post("/fileupload", async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    const realFile = files.filetoupload.name;
    var newpath = "./" + realFile;
    const fileName = realFile.slice(0, realFile.lastIndexOf(".ppt"));
    const fileExtension = realFile.slice(realFile.lastIndexOf(".ppt"));

    fs.copyFile(oldpath, newpath, async (err) => {
      if (err) {
        console.log(err.message);
        res.sendStatus(500);
      }

      processing([fileName, fileExtension], req.url).then((locationArray) => {
        fs.unlinkSync(newpath, (err) => {
          console.log(err.message);
        });

        res.send(locationArray);
      });
    });
  });
});

module.exports = router;
