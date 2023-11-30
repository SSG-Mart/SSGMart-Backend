const { Router } = require("express");
const con = require("../config/Connection");
const router = Router();

// Give Seller Dashboard Data (Seller Dashboard)
router.post("/dashboard", (req, res) => {
  if (req.session.user) {
    const { userID } = req.session.user;

    let seller_data = [];
    let item_data = [];
    let store_id;
    let category_id;
    let sub_category;
    // console.log((userID));
    const sql_one = `select seller_data.*, category.name from seller_data inner join category on seller_data.C_ID=category.C_ID where M_ID='${userID}'`;
    con.query(sql_one, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          error: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        console.log(result.length);
        if (result.length > 0) {
          store_id = result[0].seller_id;
          category_id = result[0].C_ID;
          seller_data.push(result[0]); // push
          
          //  get sub category
          const sql_get_sub_category = `SELECT SC_ID ,name FROM sub_category WHERE C_ID='${category_id}'`;
          con.query(sql_get_sub_category, (err, result) => {
            if (err) {
              console.log(err);
              res.send({
                error: { type: "error", msg: "Database error", color: "red" },
              });
            } else {
              if (result.length > 0) {
                sub_category = result;
                
              }
              else sub_category = [];
            }
          })

          const sql_two = `select items.* ,sub_category.name from items inner join sub_category on sub_category.SC_ID=items.SC_ID where seller_id='${store_id}'`;
          con.query(sql_two, (err, result) => {
            if (err) {
              console.log(err);
              res.send({ type: "error", msg: "Query Error", color: "red" });
            } else {
              if (result.length > 0) {
                item_data.push(result);
                res.send([seller_data[0], sub_category, item_data[0]]);
              } else {
                res.send([seller_data[0], sub_category, []]);
              }
            }
          });
        } else {
          res.send("not_found");
        }
      }
    });
  } else {
    res.send("unauthorized_request");
  }
});

// Verification User
router.use((req, res, next) => {
  if (req.session.user) {
    const { userID } = req.session.user;
    const { store_id } = req.body;

    const sql = `SELECT M_ID FROM seller_data WHERE seller_id='${store_id}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          error: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        if (result.length > 0) {
          if (userID == result[0].M_ID) next();
          else {
            console.log(1);
            res.send("unauthorized access");
          }
        } else {
          res.send("Result not found");
        }
      }
    });
  } else res.send("unauthorized access");
});

// Delete Item
//delete format
// { store_id: 7, item_ID: 15 }
router.post("/delete", (req, res) => {
  const { item_id } = req.body;
  const sql = `DELETE FROM items WHERE item_id='${item_id}'`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.affectedRows > 0) {
        res.send("item_deleted");
      } else res.send("item_not_found");
    }
  });
});

// Edit Item
// {
//   title: 'your data',
//   sub_category_id: 4,
//   quantity: 'your data',
//   unit: 'your data',
//   unit_price: 1500,
//   item_ID: 1,
//   store_id: 12,
// }
router.post("/edit", (req, res) => {
  const { title, sub_category_id, quantity, unit, unit_price, item_ID } =
    req.body;
  if (title && sub_category_id && quantity && unit && unit_price && item_ID) {
    const sql = `UPDATE items SET name='${title}', SC_ID='${sub_category_id}', quantity='${quantity}', unit='${unit}', unit_price='${unit_price}' WHERE item_id='${item_ID}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          error: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        if (result.affectedRows > 0) {
          res.send("item_edited");
        } else res.send("item_not_found");
      }
    });
  }
});

//add discount
router.post("/discountadd", (req, res) => {
  const { discount, item_ID } = req.body;
  if (discount && item_ID) {
    const sql = `UPDATE items SET discount='${discount}' WHERE item_id='${item_ID}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          error: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        if (result.affectedRows > 0) {
          res.send("discount_added");
        } else res.send("bad_request");
      }
    });
  } else res.send("bad_request");
});

module.exports = router;
