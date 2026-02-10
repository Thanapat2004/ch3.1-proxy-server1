const { Client } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

console.log("Testing connection to:", connectionString);

const client = new Client({
  connectionString,
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Successfully connected to the database!");
    const res = await client.query("SELECT NOW()");
    console.log("Database time:", res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}

testConnection();
