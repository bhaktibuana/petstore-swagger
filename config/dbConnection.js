const mysql = require("mysql");

const db = mysql.createConnection({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "petstore_swagger",
});

module.exports = db;