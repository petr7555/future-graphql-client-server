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
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstName TEXT, lastName TEXT)"
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
    const result = await client.query("SELECT * FROM users");
    console.info("Users have been queried.");
    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post("/users", async (req, res) => {
  const text = req.body.text;
  console.log(text);
  try {
    const client = await pool.connect();
    const queryText =
      "INSERT INTO users(firstName, lastName) VALUES($1, $2) RETURNING *";
    const savedUser = await client.query(queryText, [text]);
    console.info("A user has been saved.");
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
