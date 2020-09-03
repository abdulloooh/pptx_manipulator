const formidable = require("formidable");
const fs = require("fs");
const express = require("express");
const app = express();

app.post("/fileupload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = "./" + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.log(err.message);
        res.sendStatus(500);
      }
      res.write("File uploaded and moved!");
      res.end();
    });
  });
});
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
