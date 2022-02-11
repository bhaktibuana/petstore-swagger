const db = require("../config/dbConnection");

const deleteUser = (req, res) => {
  const username = req.params.username;

  // check if user exist
  const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result[0]["count"] > 0) {
        // delete selected user
        const deleteQuery = `DELETE FROM user WHERE username = ?;`;

        db.query(deleteQuery, [username], (err, result) => {
          if (err) {
            res.json(err);
          } else {
            res.json({
              status: 200,
              message: "User has been deleted!",
            });
          }
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

module.exports = { deleteUser };
