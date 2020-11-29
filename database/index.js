const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== "dev",
});

pool
  .connect()
  .then((client) =>
    client.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, " +
        "full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED)"
    )
  )
  .then((res) => console.log("Table users is created:", res))
  .catch((err) => console.error("Couldn't create users table.", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT id, first_name as "firstName", last_name as "lastName", full_name as "fullName" FROM users'
    );
    console.info("Users have been queried.", result.rows);
    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post("/users", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  console.log(req.body.firstName);
  try {
    const client = await pool.connect();
    const queryText =
      'INSERT INTO users(first_name, last_name) VALUES($1, $2) ' +
        'RETURNING id, first_name as "firstName", last_name as "lastName", full_name as "fullName"';
    const savedUser = await client.query(queryText, [firstName, lastName]);
    console.info("A user has been saved.", savedUser.rows[0]);
    res.send(savedUser.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post("/clear", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query("DELETE FROM users");
    console.info("Users have been deleted.");
    res.send("Users have been deleted");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(PORT, () => console.info(`Rest API Listening on ${PORT}`));
