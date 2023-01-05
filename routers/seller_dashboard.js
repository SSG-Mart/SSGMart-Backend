const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");

let store_id;

// Authenticate user
router.use((req, res, next) => {
  if (req.session.user) {
    // seller id from database
    const { userID } = req.session.user;

    const sql = `select seller_id from seller_data where M_ID='${userID}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          error: { type: "error", msg: "Database error", color: "red" },
        });
      } else {
        if (result.length > 0) {
          store_id = result[0].seller_id;
          next();
        } else {
          res.send({
            error: { type: "error", msg: "Database error", color: "red" },
          });
        }
      }
    });
  } else res.send("unauthorized request");
});

// Get seller data
router.post("/", (req, res) => {
  const sql = `
  SELECT
    items.item_id,
    items.seller_id,
    items.C_ID,
    items.SC_ID,
    items.name,
    items.unit,
    items.unit_price,
    items.description,
    items.add_date,
    items.expire_date,
    items.quantity,
    items.image,
    items.discount,
    items.R_admin_id,
    items.R_reasan,
    items.discount,
    
    user_data.image AS user_image,
    user_data.mobile,
    district.name AS city_name,
    seller_data.store_name as store_name
    
    FROM items

    INNER JOIN seller_data
    ON items.seller_id=seller_data.seller_id

    INNER JOIN user_data
    ON seller_data.M_ID=user_data.M_ID

    INNER JOIN district
    ON user_data.district_id=district.district_id

    WHERE items.seller_id=${store_id}
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send([]);
      }
    }
  });
  // res.send("seller dashboard");
});

//add discount
router.post("/discount", (req, res) => {
  const { itemID, discountPrice } = req.body;
  console.log(discountPrice);
  const sql = `UPDATE items SET discount=${discountPrice} WHERE item_id=${itemID}`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if(result.affectedRows>0){
        res.send({type:"success",msg:"Discount added successfully",color:"green"});

      }else{
        red.send({type:"error",msg:"Database error",color:"red"});
      }
    }
  });
});

// get sub category
let list_of_sub_category;
router.post("/subcategory", (req, res) => {
  const { item_id } = req.body;
  console.log(item_id);
  const sql_get_sub_category = `SELECT sub_category.*, items.C_ID FROM sub_category INNER JOIN items ON items.C_ID=sub_category.C_ID WHERE C_ID='${item_id}'`;

  con.query(sql_get_sub_category, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        list_of_sub_category = result;
        res.send(result);
      } else {
        res.send([]);
      }
    }
  }
  );
});

// get Item Data
router.post("/item", (req, res) => {
  const { itemID } = req.body;
  const sql = `
  SELECT
    items.item_id,
    items.seller_id,
    items.C_ID,
    items.SC_ID,
    items.name,
    items.unit,
    items.unit_price,
    items.description,
    items.add_date,
    items.quantity,
    items.discount,

    user_data.image AS user_image,
    user_data.mobile,
    district.name AS city_name,
    seller_data.store_name as store_name
    
    FROM items

    INNER JOIN seller_data
    ON items.seller_id=seller_data.seller_id

    INNER JOIN user_data
    ON seller_data.M_ID=user_data.M_ID

    INNER JOIN district
    ON user_data.district_id=district.district_id

    WHERE items.item_id=${itemID}
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send([]);
      }
    }
  });
  // res.send("seller dashboard");
});

// item update
router.post("/update", (req, res) => {
  const {data01} = req.body;
  console.log(data01);

  const {item_id, title, quantity, unit, unitPrice, description} = data01;

  const sql = `UPDATE items SET name='${title}', quantity='${quantity}', unit='${unit}', unit_price='${unitPrice}', description='${description}' WHERE item_id='${item_id}'`;
  con.query(sql, (err, result) => {
    if(err){
      res.send({
        error: { type: "error", msg: "Database error", color: "red" },
      });
    }
    else{
      if(result.affectedRows > 0){
        res.send("successfully_updated")
      }
      else{
        res.send("not_item_to_update")
      }
    }
  })
})

module.exports = router;
