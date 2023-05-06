const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");

router.post("/", (req, res) => {
  console.log(req.body);
  const { user } = req.session;

  // console.log(userID);
  if (typeof user === "undefined") {
    res.send("unauthorized request");
  } else {
    const { userID } = user;
    console.log("Category Id: ", req.body.C_ID);
    slq = `INSERT INTO seller_data( store_name, M_ID, C_ID, nic, nic_image) VALUES( '${req.body.STORE_NAME}', '${userID}', '${req.body.C_ID}', '${req.body.NIC}', '${req.body.NIC_image}')`;
    con.query(slq, (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        console.log(result);
        res.send("success");
      }
    });
  }
});

// Validate store name
router.post("/validate_store_name", (req, res) => {
  const { user } = req.session;
  const { store_name } = req.body;
  console.log(store_name);
  if (typeof user === "undefined") {
    res.send("unauthorized request");
  } else {
    const sql = `SELECT * FROM seller_data WHERE store_name='${store_name}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        if (result.length > 0) {
          res.send("exist");
        } else {
          res.send("not exist");
        }
      }
    });
  }
});

// Validate ID
router.post("/validate_nic", (req, res) => {
  const { user } = req.session;
  const { NIC } = req.body;
  // console.log(NIC);
  if (typeof user === "undefined") {
    res.send("unauthorized request");
  } else {
    const sql = `SELECT * FROM seller_data WHERE nic='${NIC}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        if (result.length > 0) {
          res.send("exist");
        } else {
          res.send("not exist");
        }
      }
    });
  }
});

// Check user already seller
router.post("/alreadySeller", (req, res) => {
  const { user } = req.session;
  if (typeof user === "undefined") {
    res.send("unauthorized user");
  } else {
    const { userID } = user;
    const sql = `SELECT * FROM seller_data WHERE M_ID='${userID}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        if (result.length > 0) {
          res.send("exist");
        } else {
          res.send("not exist");
        }
      }
    });
  }
});

module.exports = router;
