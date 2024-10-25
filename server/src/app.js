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

/**
 * PostgreSQL pool configuration.
 */
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: false,
});

// CORS middleware for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.get("/", (req, res) => {
  res.send({
    message: "Monty python and the holy grail!",
  });
});

/**
 * Employees endpoint.
 * @method GET /employees
 * @returns {object} List of employees.
 */
app.get("/employees", (req, res) => {
  pool
    .query("SELECT * FROM Employees;")
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

var port = 6969;
console.log(`Server is listening on localhost:${port}`);
app.listen(6969);
