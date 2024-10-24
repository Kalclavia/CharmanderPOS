const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(morgan("combine"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello world!",
  });
});

var port = 6969;
console.log(`Server is listening on localhost:${port}`);
app.listen(6969);
