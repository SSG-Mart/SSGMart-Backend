const { Router } = require("express");
const con = require("../components/Connection");
const router = Router();
const path = require("path");
var cors = require("cors");
const multer = require("multer");

router.use(cors());

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
        if (result.length > 0 && result.length < 2) {
          if (req.session.user) {
            res.send(req.session);
          } else {
            const userID = result[0].M_ID;
            req.session.user = { userID };
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

// avatar image submit
let image_for_database;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../img/user"),
  filename: (req, file, cb) => {
    image_for_database = Date.now() + "-" + file.originalname;
    cb(null, image_for_database);
  },
});

router.post("/avatar_submit", async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, (err) => {
      if (!req.file) {
        return res.send("Please select a file to upload");
      } else if (err instanceof multer.MulterError) {
        console.log("1", err);
        return res.send(err);
      } else if (err) {
        console.log("2", err);
        return res.send(err);
      } else {
        console.log("Avatar upload success");
        res.send("Avatar upload success");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//register submit
router.post("/register", (req, res) => {
  const { formData } = req.body;

  const {
    firstName,
    lastName,
    userName,
    mobile,
    email,
    addressLine1,
    city_id,
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
    addressLine1 &&
    city_id &&
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

                // Insert data to database
                const sql = `INSERT INTO user_data(f_name, l_name, user_name, mobile, status, email, address_one, district_id, password, image) VALUES ('${firstName}','${lastName}','${userName}','${mobile}','0','${email}', '${addressLine1}', '${city_id}','${password2}','${image_for_database}')`;

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

//Check auth
router.post("/checkAuth", (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({
      data: {
        msg: "Not Session",
        color: "red",
      },
    });
  }
});

module.exports = router;
