const db = require("../config/dbConnection");

// get all pet data
const getAllPetData = (req, res) => {
  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id;`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// get pet data by id
const getPetDataById = (req, res) => {
  const id = parseInt(req.params.id);

  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id WHERE p.id = ?;`;

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// get pet data by status
const getPetDataByStatus = (req, res) => {
  const status = req.query.status;

  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id WHERE p.status = ?;`;

  db.query(selectQuery, [status], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({
          status: 404,
          message: `Data with status '${status}' not found.`,
        });
      }
    }
  });
};

module.exports = {
  getAllPetData,
  getPetDataById,
  getPetDataByStatus,
};
