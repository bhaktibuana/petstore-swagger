const db = require("../config/dbConnection");
const Validator = require("validatorjs");
const validator = require("validator");

const addUser = (req, res) => {
  const userObj = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    phone: req.body.phone,
  };

  const dataValidation = dataValidator(userObj);

  if (dataValidation === true) {
    // check if user already exist
    const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ? OR username = ?;`;

    db.query(selectQuery, [userObj.email, userObj.username], (err, result) => {
      if (err) {
        res.json(err);
      } else {
        if (result[0]["count"] > 0) {
          res.json({
            status: 404,
            message: "User already exist! Use another email or username.",
          });
        } else {
          // insert user
          const insertQuery = `INSERT INTO user (username, first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?);`;

          db.query(
            insertQuery,
            [
              userObj.username,
              userObj.first_name,
              userObj.last_name,
              userObj.email,
              userObj.password,
              userObj.phone,
            ],
            (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({
                  status: 200,
                  message: "User has been created!",
                });
              }
            }
          );
        }
      }
    });
  } else {
    res.json({
      status: 404,
      message: dataValidation,
    });
  }
};

const dataValidator = (dataObj) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid. Please use Indonesian format."
  );

  const rules = {
    username: "required|string|between:5,20",
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string|min:8|confirmed",
    phone: "required|mobilePhone",
  };

  const validation = new Validator(dataObj, rules);

  if (validation.passes() === true) {
    return true;
  } else {
    return validation.errors.all();
  }
};

module.exports = { addUser };
