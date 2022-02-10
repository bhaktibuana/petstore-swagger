const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1pV7DJcm2W",
  database: "day_30",
});

module.exports = db;