const db = require("../config/dbConnection");

const addPetData = (req, res) => {
  const name = req.body.name;
  const category_id = req.body.category_id;
  const status = "available";
  const quantity = req.body.quantity;

  const insertQuery = `INSERT INTO pet (name, category_id, status, quantity) VALUES (?, ?, ?, ?);`;

  if (quantity > 0) {
    db.query(
      insertQuery,
      [name, category_id, status, quantity],
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json({
            status: 200,
            message: "Pet data added successfully.",
          });
        }
      }
    );
  } else {
    res.json({
      status: 404,
      message: "Quantity must be greater than 0.",
    });
  }
};

module.exports = { addPetData };
