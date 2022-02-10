const db = require("../config/dbConnection");

const deletePetData = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteQuery = `DELETE FROM pet WHERE id = ?;`;

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.affectedRows > 0) {
        res.json({
          status: 200,
          message: "Pet data deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `Pet data with id '${id}' not found.`,
        });
      }
    }
  });
};

module.exports = { deletePetData };