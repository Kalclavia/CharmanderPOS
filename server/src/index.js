const express = require("express");
const axios = require("axios");
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
    message: "CharmanderPOS Backend API is Functioning.",
  });
});

app.get("/python", (req, res) => {
  res.send({
    message: "Monty python and the holy grail!",
  });
});

/**
 * Get all the employees endpoint
 * @method GET /employees
 * @returns {object} List of employees
 */
app.get("/employees", (req, res) => {
  pool
    .query(
      "SELECT * FROM Employees WHERE isfired = false AND employeeid != 20 ORDER BY employeeid ASC;"
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Add a new employee endpoint
 * @method POST /employees/add
 * @returns {object} The employee to be added
 */
app.post("/employees/add", (req, res) => {
  const { employeeid, name, role, isfired } = req.body;
  pool
    .query(
      "INSERT INTO employees (employeeid, name, role, isfired, email) VALUES ($1, $2, $3, $4, 'none') RETURNING *;",
      [employeeid, name, role, isfired]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the name of an existing employee endpoint
 * @method PATCH /employees/updateName
 * @returns {object} The updated employee
 */
app.patch("/employees/updateName", (req, res) => {
  const { employeeid, name } = req.body;
  pool
    .query(
      "UPDATE employees SET name = $1 WHERE EmployeeID = $2 RETURNING *;",
      [name, employeeid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the role of an existing employee ednpoint
 * @method PATCH /employees/updateRole
 * @returns {object} The updated employee
 */
app.patch("/employees/updateRole", (req, res) => {
  const { employeeid, role } = req.body;
  pool
    .query(
      "UPDATE employees SET role = $1 WHERE EmployeeID = $2 RETURNING *;",
      [role, employeeid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update if the employee is fired of an existing employee ednpoint
 * @method PATCH /employees/updateFired
 * @returns {object} The updated employee
 */
app.patch("/employees/updateFired", (req, res) => {
  const { employeeid, isfired } = req.body;
  pool
    .query(
      "UPDATE employees SET isfired = $1 WHERE EmployeeID = $2 RETURNING *;",
      [isfired, employeeid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/employees/getFired", (req, res) => {
  pool
    .query(
      "SELECT * FROM employees WHERE isfired = true ORDER BY employeeid ASC;"
    )
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
app.delete("/inventory/delete/:ingredientid", (req, res) => {
  const ingredientid = req.params.ingredientid;
  console.log(ingredientid);
  if (!ingredientid) {
    return res.status(400).json({ error: "ingredientid is required" });
  }
  pool
    .query("DELETE FROM ingredients WHERE ingredientid = $1;", [ingredientid])
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Update the stock of an inventory item endpoint
 * @method PATCH /inventory/updateStock
 * @returns {object} The item to be updated
 */
app.patch("/inventory/updateStock", (req, res) => {
  const { ingredientid, stock } = req.body;
  console.log(ingredientid);
  console.log(stock);
  pool
    .query(
      "UPDATE ingredients SET stock = $1 WHERE ingredientid = $2 RETURNING *;",
      [stock, ingredientid]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the max stock of an inventory item endpoint
 * @method PATCH /inventory/updateMaxStock
 * @returns {object} The item to be updated
 */
app.patch("/inventory/updateMaxStock", (req, res) => {
  const { ingredientid, maxstock } = req.body;
  pool
    .query(
      "UPDATE ingredients SET maxstock = $1 WHERE ingredientid = $2 RETURNING *;",
      [maxstock, ingredientid]
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
    .then((query_res) => {
      res.json(query_res.rows[0]), console.log(res);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the id of the last item endpoint
 * @method GET /inventory/itemStock
 * @returns {object} The items stock
 */
// app.get("/inventory/itemStock", (req, res) => {
//   const { ingredientid } = req.body;
//   pool
//     .query("SELECT stock FROM ingredients WHERE ingredientid = $1;", [
//       ingredientid,
//     ])
//     .then((query_res) => res.json(query_res.rows[0]))
//     .catch((error) => res.status(500).json({ error: error.message }));
// });
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
app.get("/menu/:type", (req, res) => {
  const type = req.params.type;
  const sql = "SELECT name FROM foods WHERE type = $1 AND isremoved = false";
  pool
    .query(sql, [type])
    .then((query_res) => {
      const menuItems = query_res.rows.map((row) => row.name);
      console.log(menuItems);
      res.json(menuItems);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

// food items

/**
 * Get all menu items.
 * @method GET /menu
 * @returns {objects[]} Array of menu items with their names.
 */
app.get("/menu", (req, res) => {
  pool
    .query(
      "SELECT * FROM foods WHERE isremoved = false AND foodid != 0 ORDER BY foodid ASC;"
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get all menu items that were removed.
 * @method GET /menu/view/removed
 * @returns {objects} Array of removed menu items with their names.
 */
app.get("/menu/view/removed", (req, res) => {
  pool
    .query("SELECT * FROM foods WHERE isremoved = true ORDER BY foodid ASC;")
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the last id from the foods table.
 * @method GET /menu/item/total
 * @returns {objects} The id of the last food item.
 */
app.get("/menu/item/total", (req, res) => {
  pool
    .query("SELECT COUNT(*) FROM foods;")
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Add a new food item.
 * @method POST /menu/item/add
 * @returns {objects} Newly added food item.
 */
app.post("/menu/item/add", (req, res) => {
  const { foodid, name, type, isPremium, allergens } = req.body;
  pool
    .query(
      "INSERT INTO foods (foodid, name, type,premium, isremoved,allergens) VALUES($1,$2,$3,$4,$5, $6);",
      [foodid, name, type, isPremium, false, allergens]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Add a new food item recipe.
 * @method POST /menu/item/add/recipe
 * @returns {objects} Newly added recipe item.
 */
app.post("/menu/item/add/recipe", (req, res) => {
  const { foodid, ingredientID, quantity, foodname, ingredientname } = req.body;
  pool
    .query(
      "INSERT INTO recipes (foodid, ingredientid, quantity, foodname, ingredientname ) VALUES($1,$2,$3,$4,$5);",
      [foodid, ingredientID, quantity, foodname, ingredientname]
    )
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Remove a food item from the database.
 * @method POST /menu/item/delete
 * @returns {objects} Removed food item.
 */
app.post("/menu/item/delete", (req, res) => {
  const { foodname, foodid } = req.body;
  console.log(foodname);
  // pool
  //   .query("DELETE FROM recipes WHERE foodid = $1;", [foodid])
  //   .then()
  //   .catch((error) => res.status(500).json({ error: error.message }));
  pool
    .query("UPDATE foods SET isremoved = true WHERE foodid = $1;", [foodid])
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * View the recipe of a food item.
 * @method GET /menu/item/view/ingredients
 * @returns {objects} The recipe of the food item.
 */
app.get("/menu/item/view/ingredients", (req, res) => {
  const { foodid } = req.query;
  pool
    .query(
      "SELECT ingredients.name AS ingredient_name, quantity, ingredients.ingredientid FROM foods JOIN recipes ON foods.foodid = recipes.foodid JOIN ingredients ON recipes.ingredientid = ingredients.ingredientid WHERE foods.foodid = $1;",
      [foodid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the name and type of a food item.
 * @method PATCH /menu/item/update/type
 * @returns {objects} The updated food item.
 */
app.patch("/menu/item/update/type", (req, res) => {
  const { type, name, isRemoved, foodid, premium, allergens } = req.body;
  console.log(req.body);
  pool
    .query(
      "UPDATE foods SET type = $1, name = $2, isremoved = $3, premium = $4, allergens = $5 WHERE foodid = $6;",
      [type, name, isRemoved, premium, allergens, foodid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Update the recipe of a food item.
 * @method PATCH /menu/item/update/recipe
 * @returns {objects} The updated recipe item.
 */
app.patch("/menu/item/update/recipe", (req, res) => {
  const { quantity, ingredientID, foodid } = req.body;
  console.log(req.body);
  pool
    .query(
      `UPDATE recipes 
       SET quantity = CASE WHEN $1 = '' THEN NULL ELSE $1::INTEGER END 
       WHERE ingredientid = $2 AND foodid = $3`,
      [quantity, ingredientID, foodid]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * View the recipe of a food item.
 * @method GET /menu/item/view/recipe
 * @returns {objects} The recipe of the food item.
 */
app.get("/menu/item/view/recipe", (req, res) => {
  const { ingredientID, foodid } = req.query;
  pool
    .query("SELECT * FROM recipes WHERE ingredientid = $1 AND foodid = $2", [
      ingredientID,
      foodid,
    ])
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Get all menu prices.
 * @method GET /prices
 * @param {string} type The type of menu items to retrieve.
 * @returns {objects[]} Array of menu items with their names.
 */
app.get("/prices", (req, res) => {
  pool
    .query("SELECT * FROM itemtypes ORDER BY itemid ASC;")
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 *set menu price.
 * @method SET /prices/setprice
 * @param {string} type The type of menu items to change.
 * @returns {objects} Updated Object.
 */
app.patch("/prices/setprice", (req, res) => {
  const { type, price } = req.body;
  pool
    .query("UPDATE itemtypes SET price = $1 WHERE type = $2 RETURNING *;", [
      price,
      type,
    ])
    .then((query_res) => res.json(query_res.rows[0]))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// reports
//http://localhost:3000/report/itemsByDateRange?startDate=2023-01-01&endDate=2023-01-31
app.get("/report/itemsByDateRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  pool
    .query(
      "SELECT COALESCE(f.name, it.type) AS food_name, COALESCE(f.type, 'Drink') AS food_type FROM transactionitems ti LEFT JOIN foods f ON f.foodid = ANY (ARRAY[ti.food1, ti.food2, ti.food3, ti.food4]) JOIN itemtypes it ON ti.itemtype = it.itemid JOIN transactions t ON t.transactionid = ti.transactionid WHERE t.date >= CAST($1 AS TIMESTAMP) AND t.date <= CAST($2 AS TIMESTAMP) AND f.name NOT IN ('Bowl', 'Plate', 'Bigger Plate') AND COALESCE(f.name, it.type) != 'Default' ORDER BY food_name ASC;",
      [startDate, endDate]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/report/ingredientsByDateRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  pool
    .query(
      "SELECT i.name AS ingredient_name, i.ingredientid AS ingredient_id, SUM(r.quantity) AS total_used FROM transactionitems ti JOIN transactions t ON ti.transactionid = t.transactionid JOIN recipes r ON r.foodid IN (ti.food1, ti.food2, ti.food3, ti.food4) JOIN ingredients i ON r.ingredientid = i.ingredientid WHERE t.date >= CAST($1 AS TIMESTAMP) AND t.date <= CAST($2 AS TIMESTAMP) GROUP BY i.name, i.ingredientid ORDER BY i.name ASC;",
      [startDate, endDate]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/report/transactionBreakDown", (req, res) => {
  // let startDate = "2023-01-01";
  // let endDate = "2023-01-02";
  const today = new Date();
  let startDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let endDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() + 1);
  console.log(startDate, endDate);
  pool
    .query(
      "SELECT COUNT(t.transactionid) AS num_orders, EXTRACT(HOUR FROM t.date) AS order_hour, SUM(t.total) AS order_total, t.employeeid, e.name AS employee_name FROM transactions t JOIN employees e ON t.employeeid = e.employeeid WHERE t.date >= CAST($1 AS TIMESTAMP) AND t.date < CAST($2 AS TIMESTAMP) GROUP BY order_hour, t.employeeid, e.name ORDER BY order_hour ASC;",
      [startDate, endDate]
    )
    .then((query_res) => res.json(query_res.rows))
    .catch((error) => res.status(500).json({ error: error.message }));
});
/**
 * Get the price of a specific menu item.
 * @method GET /menu/price
 * @param {string} itemName The name of the item to retrieve the price of.
 * @returns {object} The price of the specified item.
 */
app.get("/menu/price", async (req, res) => {
  const itemName = req.query.itemName; // Get item name from query parameter
  const sql = "SELECT type, price FROM itemtypes WHERE type = $1";

  try {
    const query_res = await pool.query(sql, [itemName]);
    if (query_res.rows.length > 0) {
      const price = query_res.rows[0].price;
      res.json({ price });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error fetching item price:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get the newest transaction ID.
 * @method GET /transactions/latestID
 * @returns {object} The latest transaction ID incremented by 1.
 */
app.get("/transactions/latestID", async (req, res) => {
  const sql = "SELECT MAX(transactionid) FROM transactions";

  try {
    const query_res = await pool.query(sql);
    const transactionID = query_res.rows[0].max; // Get the max transaction ID
    const nextTransactionID = transactionID !== null ? transactionID + 1 : 1; // Increment by 1, default to 1 if null
    res.json({ transactionID: nextTransactionID });
  } catch (error) {
    console.error("Error fetching transaction ID:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get the price of a specific item.
 * @method GET /price/:itemName
 * @param {string} itemName The name of the item to retrieve the price for.
 * @returns {object} The price of the given item.
 */
app.get("/price/:itemName", (req, res) => {
  const itemName = req.params.itemName;
  const sql = "SELECT price FROM itemtypes WHERE type = $1";
  pool
    .query(sql, [itemName])
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        res.json({ price: query_res.rows[0].price });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Get the recipe of a food item.
 * @method GET /recipe/:itemName
 * @param {string} itemName The name of the food.
 * @returns {object[]} An array of ingredients with their names, quantities, and IDs.
 */
app.get("/recipe/:itemName", (req, res) => {
  const itemName = req.params.itemName;
  const sql = `
    SELECT 
      ingredients.name AS ingredient_name, 
      quantity, 
      ingredients.ingredientid
    FROM 
      foods
      JOIN recipes ON foods.foodid = recipes.foodid
      JOIN ingredients ON recipes.ingredientid = ingredients.ingredientid
    WHERE 
      foods.name = $1;
  `;

  pool
    .query(sql, [itemName])
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        const ingredients = query_res.rows.map((row) => ({
          name: row.ingredient_name,
          quantity: row.quantity,
          ingredientID: row.ingredientid,
        }));
        res.json(ingredients);
      } else {
        res
          .status(404)
          .json({ error: "Recipe not found for the specified item." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Get the inventory quantity of a specific item.
 * @method GET /inventory/:itemName
 * @param {string} itemName The name of the item to check inventory for.
 * @returns {object} The stock quantity of the given item.
 */
app.get("/inventory/:itemName", (req, res) => {
  const itemName = req.params.itemName;
  const sql = "SELECT stock FROM ingredients WHERE name = $1";

  pool
    .query(sql, [itemName])
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        res.json({ stock: query_res.rows[0].stock });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Update inventory by reducing the stock of an ingredient.
 * @method PUT /inventory
 * @param {number} ingredientID The ID of the ingredient.
 * @param {number} usedIngredients The amount of the ingredient that was used.
 * @returns {object} Success message or error details.
 */
app.put("/inventory", (req, res) => {
  const { ingredientID, usedIngredients } = req.body;

  if (!ingredientID || !usedIngredients || usedIngredients < 0) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  const sql =
    "UPDATE ingredients SET stock = stock - $1 WHERE ingredientID = $2";

  pool
    .query(sql, [usedIngredients, ingredientID])
    .then((query_res) => {
      if (query_res.rowCount > 0) {
        res.json({
          message: "Inventory updated successfully.",
          rowsUpdated: query_res.rowCount,
        });
      } else {
        res
          .status(404)
          .json({ error: "Ingredient not found or no rows updated." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Adds a new transaction into the transactions table.
 * @method POST /transaction
 * @param {number} transactionID The ID of the transaction.
 * @param {number} employeeID The ID of the employee.
 * @param {number} total The total amount of the transaction.
 * @param {string} date The date the transaction took place.
 * @param {string} paymentMethod The method of payment.
 * @returns {object} Success message or error details.
 */
app.post("/transaction", (req, res) => {
  const { transactionID, employeeID, total, date, paymentMethod } = req.body;

  if (!transactionID || !employeeID || !total || !date || !paymentMethod) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log(transactionID, employeeID, total, date, paymentMethod);
  const sql = `
    INSERT INTO transactions (transactionid, employeeid, total, date, paymentmethod) 
    VALUES ($1, $2, $3, $4, $5)
  `;

  pool
    .query(sql, [transactionID, employeeID, total, date, paymentMethod])
    .then((query_res) => {
      res.json({
        message: "Transaction added successfully.",
        rowsUpdated: query_res.rowCount,
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Adds items from a transaction to the transactionitems table.
 * @method POST /transactionitems
 * @param {number} transactionID The ID of the transaction.
 * @param {number} itemid The ID of the item from the itemtypes table.
 * @param {number} food1 The ID of the first food item from the foods table.
 * @param {number} food2 The ID of the second food item from the foods table.
 * @param {number} food3 The ID of the third food item from the foods table.
 * @param {number} food4 The ID of the fourth food item from the foods table.
 * @returns {object} Success message or error details.
 */
app.post("/transactionitems", (req, res) => {
  const { transactionID, itemid, food1, food2, food3, food4 } = req.body;

  if (
    !transactionID ||
    !itemid ||
    food1 == null ||
    food2 == null ||
    food3 == null ||
    food4 == null
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO transactionitems (transactionid, itemtype, food1, food2, food3, food4) 
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  pool
    .query(sql, [transactionID, itemid, food1, food2, food3, food4])
    .then((query_res) => {
      res.json({
        message: "Transaction items added successfully.",
        rowsUpdated: query_res.rowCount,
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Gets the item ID from the itemtypes table based on the type name.
 * @method GET /itemid/:type
 * @param {string} type The name of the item type.
 * @returns {number} The ID of the item type.
 */
app.get("/itemid/:type", (req, res) => {
  const type = req.params.type;

  if (!type) {
    return res.status(400).json({ error: "Type name is required." });
  }

  const sql = "SELECT itemid FROM itemtypes WHERE type = $1";

  pool
    .query(sql, [type])
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        res.json({ itemID: query_res.rows[0].itemid });
      } else {
        res.status(404).json({ error: "Item type not found." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Gets the food ID from the foods table based on the item name.
 * @method GET /foodid/:name
 * @param {string} name The name of the food item.
 * @returns {number} The ID of the food item.
 */
app.get("/foodid/:name", (req, res) => {
  const itemName = req.params.name;

  if (!itemName) {
    return res.status(400).json({ error: "Item name is required." });
  }

  const sql = "SELECT foodid FROM foods WHERE name = $1";

  pool
    .query(sql, [itemName])
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        res.json({ foodID: query_res.rows[0].foodid });
      } else {
        res.status(404).json({ error: "Food item not found." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

/**
 * Checks if a food item is premium based on its name.
 * @method GET /ispremium/:name
 * @param {string} name The name of the food item.
 * @returns {boolean} A response indicating whether the item is premium.
 */
app.get("/ispremium/", (req, res) => {
  // const itemName = req.params.name;
  // if (!itemName) {
  //   return res.status(400).json({ error: "Item name is required." });
  // }
  const sql =
    "SELECT name FROM foods WHERE name != 'Default' AND premium = true";
  pool
    .query(sql)
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        res.json(query_res.rows);
      } else {
        res.status(404).json({ error: "Food item not found." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});



/**
 * Gets the allergens for a specific food item by its name.
 * @method GET /allergens/:name
 * @param {string} name The name of the food item.
 * @returns {string} The allergens associated with the food item.
 */
app.get("/allergens", (req, res) => {
  const sql = "SELECT name, allergens FROM foods WHERE name != 'Default'";
  
  pool
    .query(sql)
    .then((query_res) => {
      if (query_res.rows.length > 0) {
        const allergens = query_res.rows.map(row => ({
          name: row.name,
          allergens: row.allergens || "No allergens specified"
        }));
        res.json(allergens); // Send all items with allergens
      } else {
        res.status(404).json({ error: "No food items found." });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

var port = 3000;
console.log(`Server is listening on localhost:${port}`);
app.listen(3000);

module.exports = app;
