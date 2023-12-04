const { Router } = require("express");
const router = Router();

const con = require("../config/Connection");

// router.use((req, res, next) => {
//   if (req.session.user) next();
//   else res.send("Home page");
// });

router.post("/", (req, res) => {
  const { user } = req.session;
  var data = [];
  const sql = `SELECT items.*, seller_data.*, user_data.mobile , user_data.image as user_image, user_data.district_id, user_data.restrict_ad as user_restrict, district.name as district_name 
  FROM items 
  INNER JOIN seller_data 
  on items.seller_id=seller_data.seller_id
  INNER JOIN user_data
  on seller_data.M_ID=user_data.M_ID
  inner join district
  ON user_data.district_id=district.district_id`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("database error");
      return;
    } else {
      if (result.length > 0) {
        result.forEach((item) => {
          let today = new Date();
          let expire_date = new Date(item.expire_date);
          const more = expire_date - today;
          console.log('more', more, item.R_admin_id == 1, item.user_restrict == 0);
          if (more > 0 && item.R_admin_id == 1 && item.user_restrict == 0 && item.activation_state == 1) {
            console.log(item.mobile);
            data.push({
              item_id: item.item_id,
              seller_id: item.seller_id,
              category_id: item.C_ID,
              sub_category_id: item.SC_ID,
              name: item.name,
              unit: item.unit,
              unit_price: item.unit_price,
              discount: item.discount,
              description: item.description,
              add_date: item.add_date,
              expire_date: item.expire_date,
              quantity: item.quantity,
              image: item.image,
              user_image: item.user_image,
              mobile: typeof user == "undefined" ? "**********" : item.mobile,
              district_name: item.district_name,
              R_admin_id: item.R_admin_id,
              R_reasan: item.R_reasan,
              store_name: item.store_name,
              ratings: item.ratings,
              date_of_register: item.date_of_register,
              seller_verification: item.admin_verification,
            });
          }
        });
        console.log(data);
        res.send(data);
      } else {
        res.send([]);
      }
    }
  });
});

module.exports = router;
