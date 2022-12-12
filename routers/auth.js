const { Router } = require("express");
const con = require("../components/Connection");
const router = Router();

const date = new Date();

// login

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  if (userName && password) {
    // find username and password in database
    const sql = `SELECT * FROM user_data WHERE user_name = '${userName}' AND password = '${password}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 404,
          data: {
            msg: "Process failed Try again..",
            color: "red",
          },
        });
      } else {
        if (result.length > 0) {
          if (req.session.user) {
            res.send(req.session.user);
          } else {
            req.session.user = { userName };
            res.send(req.session);
          }
        } else {
          if (req.session) {
            req.session.destroy();
          }
          res.send({
            status: 404,
            data: {
              msg: "User name or password is incorrect",
              color: "red",
            },
          });
        }
      }
    });

  } else {
    res.send({
      status: 404,
      data: {
        msg: "Process failed Try again..",
        color: "red",
      },
    });
  }
});
// register
router.post("/register", (req, res) => {
  const { formData } = req.body;
  const {
    firstName,
    lastName,
    userName,
    mobile,
    email,
    image,
    password1,
    password2,
    checkbox,
  } = formData;

  if (
    firstName &&
    lastName &&
    userName &&
    mobile &&
    email &&
    image &&
    password1 &&
    password2 &&
    password1 === password2 &&
    checkbox === true
  ) {
    const sql_check_username = `SELECT * FROM user_data WHERE user_name = '${userName}'`;
    const sql_check_email = `SELECT * FROM user_data WHERE email = '${email}'`;

    // Check username already exist
    con.query(sql_check_username, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 404,
          data: {
            msg: "Process failed Try again..",
            color: "red",
          },
        });
      } else {
        if (result.length > 0) {
          console.log("User name already exist");
          res.send({
            status: 201,
            data: {
              msg: "User name already exist",
              color: "red",
            },
          });
        } else {
          // Check email already exist
          con.query(sql_check_email, (err, result1) => {
            if (err) {
              console.log(err);
              res.send({
                status: 404,
                data: {
                  msg: "Process failed. Try again..",
                  color: "red",
                },
              });
            } else {
              if (result1.length > 0) {
                console.log("Email already exist");
                res.send({
                  status: 201,
                  data: {
                    msg: "Email already exist",
                    color: "red",
                  },
                });
              } else {
                // Get Current Date
                const currentDate = `${date.getFullYear()}-${date.getUTCDate()}-${date.getDate()}`;
                
                // Insert data to database
                const sql = `INSERT INTO user_data(f_name, l_name, user_name, mobile, status, date_of_reg, email, password, image) VALUES ('${firstName}','${lastName}','${userName}','${mobile}','0','${currentDate}','${email}','${password2}','${image}]')`;
                con.query(sql, (err) => {
                  if (err) {
                    console.log(err);
                    res.send({
                      status: 404,
                      data: {
                        msg: "Process failed Try again..",
                        color: "red",
                      },
                    });
                  } else {
                    console.log("Registration Success");
                    res.status(201);
                    res.send({
                      status: 201,
                      data: {
                        msg: "Registration successful",
                        color: "green",
                      },
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  } else {
    console.log("Condition error");
    res.send({
      status: 404,
      data: {
        msg: "Process failed Try again..",
        color: "red",
      },
    });
  }
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.send({
      status: 201,
      data: {
        msg: "Session destroyed successfully",
        color: "green",
      },
    });
  } else {
    res.send({
      status: 404,
      data: {
        msg: "Session destroy failed",
        color: "red",
      },
    });
  }
});

module.exports = router;
