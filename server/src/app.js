const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(morgan("combine"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
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

// Inventory backend

/**
 * Get inventory item endpoint
 * @method GET /inventory
 * @returns {object} List inventory item
 */
app.get("/inventory", (req, res) => {
  pool
    .query("SELECT * FROM ingredients ORDER BY ingredientid ASC")
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Add new inventory item endpoint
 * @method POST /inventory/add
 * @returns {object} Newly added inventory item
 */
app.post("/inventory/add", (req, res) => {
  const { ingredientid, name, stock, maxstock, units } = req.body;
  pool
    .query(
      "INSERT INTO ingredients (ingredientid, name, stock, maxstock, units) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [ingredientid, name, stock, maxstock, units]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Delete an inventory item endpoint
 * @method DELETE /inventory/delete
 * @returns {object} The item to be deleted
 */
app.delete("/inventory/delete", (req, res) => {
  const { ingredientid } = req.body;

  if (!ingredientid) {
    return res.status(400).json({ error: "ingredientid is required" });
  }

  pool
    .query("DELETE FROM ingredients WHERE ingredientid = $1 RETURNING *;", [
      ingredientid,
    ])
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        return res.status(404).json({ error: "Ingredient not found" });
      }
      res.json(query_res.rows[0]);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Update the stock of an inventory item endpoint
 * @method PATCH /inventory/updateStock
 * @returns {object} The item to be updated
 */
app.patch("/inventory/updateStock", (req, res) => {
  const { ingredientid, stock } = req.body;
  pool
    .query(
      "UPDATE ingredients SET stock = $1 WHERE ingredientid = $2 RETURNING *;",
      [stock, ingredientid]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the name of an inventory item endpoint
 * @method PATCH /inventory/updateName
 * @returns {object} The item to be updated
 */
app.patch("/inventory/updateName", (req, res) => {
  const { ingredientid, name } = req.body;
  pool
    .query(
      "UPDATE ingredients SET name = $1 WHERE ingredientid = $2 RETURNING *;",
      [name, ingredientid]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the id of the last item endpoint
 * @method GET /inventory/id
 * @returns {object} The item to be updated
 */
app.get("/inventory/id", (req, res) => {
  pool
    .query("SELECT COUNT(*) FROM ingredients")
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the id of the last item endpoint
 * @method GET /inventory/itemStock
 * @returns {object} The items stock
 */
app.get("/inventory/itemStock", (req, res) => {
  const { ingredientid } = req.body;
  pool
    .query("SELECT stock FROM ingredients WHERE ingredientid = $1;", [
      ingredientid,
    ])
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the 10 lowest stocked items
 * @method GET /inventory/itemStock
 * @returns {object} The 10 items in JSON format
 */
app.get("/inventory/lowestStockedItems", (req, res) => {
  pool
    .query("SELECT * FROM ingredients i ORDER BY i.stock ASC LIMIT 10")
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the ingredient ID given a name
 * @method GET /inventory/getIngredientID
 * @returns {object} The ingredient ID
 */
app.get("/inventory/getIngredientID", (req, res) => {
  const { name } = req.body;
  pool
    .query("SELECT ingredientid FROM ingredients WHERE name = $1", [name])
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the ingredient name given a ID
 * @method GET /inventory/getIngredientName
 * @returns {object} The ingredients name
 */
app.get("/inventory/getIngredientName", (req, res) => {
  const { ingredientid } = req.body;
  pool
    .query("SELECT name FROM ingredients WHERE ingredientid = $1", [
      ingredientid,
    ])
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the inventory from a transaction
 * @method PATCH /inventory/updateStockFromTransaction
 * @returns {object} The ingredients that were updated
 */
app.patch("/inventory/updateStockFromTransaction", (req, res) => {
  const { usedIngredients, ingredientid } = req.body;
  pool
    .query(
      "UPDATE ingredients SET stock = stock - $1 WHERE ingredientID = $2 RETURNING *;",
      [usedIngredients, ingredientid]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get specific menu items by type.
 * @method GET /menu/:type
 * @param {string} type The type of menu items to retrieve.
 * @returns {objects[]} Array of menu items with their names.
 */
app.get('/menu/:type', async (req, res) => {
  const type = req.params.type;
  const sql = "SELECT name FROM foods WHERE type = $1";

  pool
    .query(sql, [type])
    .then((query_res) => {
      const menuItems = query_res.rows.map((row) => row.name);
      res.json(menuItems);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});
var port = 3000;
console.log(`Server is listening on localhost:${port}`);
app.listen(3000);
