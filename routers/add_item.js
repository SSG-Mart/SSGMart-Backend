const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");

router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send("unauthorized request");
});

// get seller id
let sellerID;
router.use((req, res, next) => {
  const { userID } = req.session.user;
  const sql_get_seller_id = `SELECT seller_id FROM seller_data WHERE M_ID='${userID}'`;
  con.query(sql_get_seller_id, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        data: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        sellerID = result[0].seller_id;
        next();
      } else {
        res.send({
          status: 404,
          data: { type: "error", msg: "Not Found", color: "red" },
        });
      }
    }
  });
});

// get category id
let category_id;
router.use((req, res, next) => {
  const { userID } = req.session.user;
  const sql_get_category_id = `SELECT C_ID FROM seller_data WHERE M_ID='${userID}'`;
  con.query(sql_get_category_id, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        data: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        category_id = result[0].C_ID;
        next();
      } else {
        res.send({
          status: 404,
          data: { type: "error", msg: "Not Found", color: "red" },
        });
      }
    }
  });
});

// get sub category
let list_of_sub_category;
router.use((req, res, next) => {
  const { userID } = req.session.user;
  const sql_get_sub_category = `SELECT SC_ID ,name FROM sub_category WHERE C_ID='${category_id}'`;
  con.query(sql_get_sub_category, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        data: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        const data = [];
        result.forEach((item) => {
          data.push({ id: item.SC_ID, name: item.name });
        });
        list_of_sub_category = data;
        next();
      } else {
        res.send({
          status: 404,
          data: { type: "error", msg: "Not Found", color: "red" },
        });
      }
    }
  });
});

router.post("/", (req, res) => {
  const { userID } = req.session.user;
  const {
    title,
    category_id,
    quantity,
    image,
    unit,
    sub_category_id,
    unit_price,
    description,
    time_period,
  } = req.body;

  if (
    (title &&
      category_id &&
      quantity &&
      image &&
      unit &&
      sub_category_id &&
      unit_price &&
      description,
    time_period)
  ) {
    const now = new Date();
    const expire_date = new Date(
      new Date().getTime() + time_period * 24 * 60 * 60 * 1000
    );

    // insert data into database
    const sql = `INSERT INTO items(seller_id, C_ID, SC_ID, name, unit, unit_price, description, add_date, expire_date, quantity, image) 
    VALUES ('${sellerID}','${category_id}','${sub_category_id}','${title}','${unit}','${unit_price}','${description}','${now}', '${expire_date}','${quantity}','${image}')`;

    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          data: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        res.send({ result: "add item successfully", return: result });
      }
    });
  } else {
    res.send({
      status: 500,
      data: { type: "error", msg: "fill all data", color: "red" },
    });
  }
});

router.post("/getcategory", (req, res) => {
  const mainCategoryID = category_id;
  const sql = `SELECT name FROM category WHERE C_ID='${mainCategoryID}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        data: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        const { name } = result[0];
        res.send([
          { id: mainCategoryID, name: name },
          { list_of_sub_category },
        ]);
      } else {
        res.send({
          status: 404,
          data: { type: "error", msg: "Not Found", color: "red" },
        });
      }
    }
  });
});

module.exports = router;
