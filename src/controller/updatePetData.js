const db = require("../config/dbConnection");

const updatePetData = (req, res) => {
  const id = parseInt(req.body.id);
  const name = req.body.name;
  const category_id = req.body.category_id;
  const status = req.body.status;
  const quantity = req.body.quantity;

  const updateQuery = `UPDATE pet SET name = ?, category_id = ?, status = ?, quantity = ? WHERE id = ?;`;

  db.query(
    updateQuery,
    [name, category_id, status, quantity, id],
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        if (result.affectedRows > 0) {
          res.json({
            status: 200,
            message: "Pet data updated successfully.",
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `Pet data with id '${id}' not found.`,
          })
        }
      }
    }
  );
};

module.exports = { updatePetData };