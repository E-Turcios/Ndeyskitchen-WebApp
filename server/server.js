const express = require("express");
const app = express();

require("dotenv").config();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({mssg: "Welcome"});
});
app.listen(4000, () => {
  console.log("Server is listenning on port", process.env.PORT);
});
