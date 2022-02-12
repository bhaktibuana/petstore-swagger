const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost", // "localhost" by default
  user: "root", // "root" by default
  password: "1pV7DJcm2W",
  database: "petstore_swagger",
});

module.exports = db;
