const express = require("express");
const app = express();
const processing = require("./utility/processing");
const route = require("./router/route");

require("./startup/error")();
require("./startup/prod")(app);

app.use("/", route);
app.use(processing);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
