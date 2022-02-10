const db = require("../config/dbConnection");

const deleteStoreOrder = (req, res) => {
  const orderId = parseInt(req.params.id);

  // check if order id exists and get pet_id, quantity from store_order
  const selectQuery = `SELECT pet_id, quantity FROM store_order WHERE id = ? AND complete = FALSE;`;

  db.query(selectQuery, [orderId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        const petId = result[0].pet_id;
        const orderQuantity = result[0].quantity;

        // check if pet exists and get quantity from pet
        const selectQuery = `SELECT quantity FROM pet WHERE id = ?;`;

        db.query(selectQuery, [petId], (err, result) => {
          if (err) {
            res.json(err);
          } else {
            const quantity = result[0].quantity;

            // executing delete store order if status order is not complete or false
            const deleteQuery = `DELETE FROM store_order WHERE id = ? AND complete = FALSE;`;

            db.query(deleteQuery, [orderId], (err, result) => {
              if (err) {
                res.json(err);
              } else {
                if (quantity === 0) {
                  // updating pet status to available if quantity is 0
                  const updateQuery = `UPDATE pet SET quantity = quantity + ?, status = "available", updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
                  db.query(updateQuery, [orderQuantity, petId], (err, result) => {
                    if (err) {
                      res.json(err);
                    } else {
                      res.json({
                        status: 200,
                        message: `Store order with id '${orderId}' has been deleted.`,
                      });
                    }
                  });
                } else {
                  // updating pet quantity as value quantity of order that has been deleted
                  const updateQuery = `UPDATE pet SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
                  db.query(updateQuery, [orderQuantity, petId], (err, result) => {
                    if (err) {
                      res.json(err);
                    } else {
                      res.json({
                        status: 200,
                        message: `Store order with id '${orderId}' has been deleted.`,
                      });
                    }
                  });
                }
              }
            });
          }
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `Store order with id '${orderId}' not found or maybe has delivered.`,
        });
      }
    }
  });
};

module.exports = { deleteStoreOrder };
