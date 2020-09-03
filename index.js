const express = require("express");
const app = express();

app.get("/file", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
