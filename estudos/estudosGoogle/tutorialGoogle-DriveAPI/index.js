const express = require("express");
const routes = require("./src/routes");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  return console.log("Server running on port 3333!");
});
