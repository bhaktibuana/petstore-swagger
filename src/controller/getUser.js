const db = require("../config/dbConnection");

const getUser = (req, res) => {
  const username = req.params.username;

  const selectQuery = `SELECT username, first_name, last_name, email, phone FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        res.json({
          status: 200,
          data: result[0],
        });
      } else {
        res.json({
          status: 404,
          message: `User with username '${username}' not found!`,
        });
      }
    }
  });
};

module.exports = { getUser };
