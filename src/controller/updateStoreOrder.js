const db = require("../config/dbConnection");
const moment = require("moment");

const date = new Date();
const getHours = date.getHours();

// update store order complete and status approved
const updateOrderComplete = (req, res) => {
  const orderId = req.body.id;
  const shipDate =
    getHours < 13
      ? moment().format("YYYY-MM-DD") + " 14:59:59"
      : dateTomorrow(moment().format("YYYY-MM-DD"));

  const updateQuery = `UPDATE store_order SET complete = TRUE, status = "approved", ship_date = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

  db.query(updateQuery, [shipDate, orderId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.affectedRows > 0) {
        res.json({
          status: 200,
          message: "Store order updated successfully.",
        });
      } else {
        res.json({
          status: 404,
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

const dateTomorrow = (date) => {
  const dateArr = date.split("-");
  const replaceDate = parseInt(dateArr[dateArr.length - 1]) + 1;
  dateArr.pop();
  dateArr.push(replaceDate.toString());
  return dateArr.join("-") + " 08:59:59";
};


// update store order status delivered
const updateOrderDelivered = (req, res) => {
  const orderId = req.body.id;

  const updateQuery = `UPDATE store_order SET status = "delivered", updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

  db.query(updateQuery, [orderId], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.affectedRows > 0) {
        res.json({
          status: 200,
          message: "Store order updated successfully.",
        });
      } else {
        res.json({
          status: 404,
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

module.exports = { updateOrderComplete, updateOrderDelivered };
