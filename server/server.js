const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

//db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("no database connect");
    console.log("DB Error => ", err);
  });

//middleware
app.use(morgan("dev")); // color output
app.use(bodyParser.json({ limit: "2mb" }));

//routes middleware
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

const port = process.env.port || 8000;
// server.listen(5500, () => {
//   console.log("Server running :", 5500);
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
