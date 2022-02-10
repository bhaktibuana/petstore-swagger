const db = require("../config/dbConnection");

const addStoreOrder = (req, res) => {
  const petId = req.body.pet_id;
  const quantity = req.body.quantity;
  const status = "placed";

  // Check if pet exists
  const selectQuery = `SELECT name, status, quantity FROM pet WHERE id = ?;`;

  db.query(selectQuery, [petId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        if (result[0].status !== "available") {
          res.json({
            status: 404,
            message: `Pet with name '${result[0].name}' and id '${petId}' is not available or sold out.`,
          });
        } else {
          if (result[0].quantity < quantity) {
            res.json({
              status: 404,
              message: `Pet with name '${result[0].name}' and id '${petId}' has only ${result[0].quantity} units available.`,
            });
          } else {
            if (quantity > 0) {
              // insert store order data
              const insertQuery = `INSERT INTO store_order (pet_id, quantity, status) VALUES (?, ?, ?);`;

              if (quantity === result[0].quantity) {
                db.query(
                  insertQuery,
                  [petId, quantity, status],
                  (err, result) => {
                    if (err) {
                      res.json(err);
                    } else {
                      // update quantity pet data after add store order
                      const updateQuery = `UPDATE pet SET quantity = quantity - ?, updated_at = CURRENT_TIMESTAMP(), status = "sold" WHERE id = ?;`;

                      db.query(
                        updateQuery,
                        [quantity, petId],
                        (err, result) => {
                          if (err) {
                            res.json(err);
                          } else {
                            res.json({
                              status: 200,
                              message: "Store order added successfully.",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                db.query(
                  insertQuery,
                  [petId, quantity, status],
                  (err, result) => {
                    if (err) {
                      res.json(err);
                    } else {
                      // update quantity pet data after add store order
                      const updateQuery = `UPDATE pet SET quantity = quantity - ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

                      db.query(
                        updateQuery,
                        [quantity, petId],
                        (err, result) => {
                          if (err) {
                            res.json(err);
                          } else {
                            res.json({
                              status: 200,
                              message: "Store order added successfully.",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            } else {
              res.json({
                status: 404,
                message: "Quantity must be greater than 0.",
              });
            }
          }
        }
      } else {
        res.json({
          status: 404,
          message: `Pet with id '${petId}' not found.`,
        });
      }
    }
  });
};

module.exports = { addStoreOrder };
