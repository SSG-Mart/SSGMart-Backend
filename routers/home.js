const { Router } = require("express");
const router = Router();

const con = require("../components/Connection");

// router.use((req, res, next) => {
//   if (req.session.user) next();
//   else res.send("Home page");
// });

router.post("/", (req, res) => {
  const { user } = req.session;
  var data = [];
  const sql = `SELECT items.*, seller_data.*, user_data.mobile 
  FROM items 
  INNER JOIN seller_data 
  on items.seller_id=seller_data.seller_id
  INNER JOIN user_data
  on seller_data.M_ID=user_data.M_ID`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("database error");
      return;
    } else {
      console.log(result);
      if (result.length > 0) {
        result.forEach((item) => {
          let today = new Date();
          let expire_date = new Date(item.expire_date);
          const more = expire_date - today;

          if (more > 0) {
            console.log(item.mobile);
            data.push({
              item_id: item.item_id,
              seller_id: item.seller_id,
              category_id: item.C_ID,
              sub_category_id: item.SC_ID,
              name: item.name,
              unit: item.unit,
              unit_price: item.unit_price,
              description: item.description,
              add_date: item.add_date,
              expire_date: item.expire_date,
              quantity: item.quantity,
              image: item.image,
              mobile: typeof user == "undefined" ? "**********" : item.mobile,
              R_admin_id: item.R_admin_id,
              R_reasan: item.R_reasan,

              store_name: item.store_name,
              ratings: item.ratings,
              A_Status: item.A_Status,
              date_of_register: item.date_of_register,
            });
          }
        });
        res.send(data);
      } else {
        res.send("No data found");
      }
    }
  });
});

module.exports = router;
