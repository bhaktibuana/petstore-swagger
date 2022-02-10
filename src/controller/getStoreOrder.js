const db = require("../config/dbConnection");

const getStoreOrder = (req, res) => {
  const orderId = parseInt(req.params.id);

  const selectQuery = `SELECT so.id, p.name AS pet_name, so.quantity, so.ship_date, so.status, so.complete FROM store_order AS so JOIN pet AS p ON so.pet_id = p.id WHERE so.id = ?;`;

  db.query(selectQuery, [orderId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({
          status: 404,
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

module.exports = { getStoreOrder };
