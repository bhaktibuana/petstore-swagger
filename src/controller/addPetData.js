const db = require("../config/dbConnection");

const addPetData = (req, res) => {
  const name = req.body.name;
  const category_id = req.body.category_id;
  const status = req.body.status;
  const quantity = req.body.quantity;

  const insertQuery = `INSERT INTO pet (name, category_id, status, quantity) VALUES (?, ?, ?, ?);`;
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
};

module.exports = { addPetData };
