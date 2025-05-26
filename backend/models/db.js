const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.MYSQL_PORT || 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
