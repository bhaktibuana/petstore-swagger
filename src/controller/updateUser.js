const db = require("../config/dbConnection");
const Validator = require("validatorjs");
const validator = require("validator");

const updateUser = (req, res) => {
  const username = req.params.username;
  const userObj = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  // check if user exist and validate password
  const selectQuery = `SELECT password FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length > 0) {
        // verify password
        if (result[0].password === userObj.password) {
          // validate new data
          const dataValidation  = dataValidator(userObj);

          if (dataValidation === true) {
            // check if user already exist with new data updated
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
                  // update user
                  const updateQuery = `UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP() WHERE username = ?;`;

                  db.query(
                    updateQuery,
                    [
                      userObj.username,
                      userObj.first_name,
                      userObj.last_name,
                      userObj.email,
                      userObj.phone,
                      username,
                    ],
                    (err, result) => {
                      if (err) {
                        res.json(err);
                      } else {
                        res.json({
                          status: 200,
                          message: "User has been updated!",
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
        } else {
          res.json({
            status: 404,
            message: "Password is incorrect!",
          });
        }
      } else {
        res.json({
          status: 404,
          message: `User with username '${username}' not found!`,
        });
      }
    }
  });
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
    phone: "required|mobilePhone",
  };

  const validation = new Validator(dataObj, rules);

  if (validation.passes() === true) {
    return true;
  } else {
    return validation.errors.all();
  }
};

module.exports = { updateUser };
