const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1pV7DJcm2W",
  database: "petstore_swagger",
});

module.exports = db;