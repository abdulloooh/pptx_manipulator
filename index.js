const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const route = require("./router/route");
require("./startup/error")();
require("./startup/prod")(app);

app.use(express.static(path.join(`${__dirname}/`, "results")));
app.use(cors());

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
