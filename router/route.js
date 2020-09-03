const formidable = require("formidable");
const fs = require("fs");
const express = require("express");
const router = express.Router();

router.post("/fileupload", (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    const realFile = files.filetoupload.name;
    var newpath = "./" + realFile;
    const name = realFile.slice(0, realFile.lastIndexOf(".ppt"));
    const extension = realFile.slice(realFile.lastIndexOf(".ppt"));

    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.log(err.message);
        res.sendStatus(500);
      }
      next([name, extension]);
    });
  });
});
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

module.exports = router;
