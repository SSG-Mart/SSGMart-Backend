const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");

router.post("/", (req, res) => {
  const { user } = req.session;

  //Get store name from client side
  const store_name_from_client_side = req.body.store_name;

  if (typeof(store_name_from_client_side) == "undefined") {
    res.send("store name not found");
    return;
  } else {
    //get data from database
    
    let data1 = [];
    let data2 = [];

    const sql = `select seller_data.*, user_data.mobile, user_data.image, user_data.restrict_ad as user_restrict_ad, district.name from seller_data INNER JOIN user_data on seller_data.M_ID=user_data.M_ID INNER JOIN district on user_data.district_id=district.district_id WHERE seller_data.store_name='${store_name_from_client_side}'`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send("database error");
        return;
      } else {
        console.log('DDDD: ', result.length > 0 , result[0].user_restrict_ad == 0);
        if (result.length > 0 && result[0].user_restrict_ad == 0) {
          data1.push({
            seller_id: result[0].seller_id,
            C_ID: result[0].C_ID,
            store_name: result[0].store_name,
            ratings: result[0].ratings,
            A_Status: result[0].A_Status,
            date_of_register: result[0].date_of_register,
            city: result[0].name,
            verify_seller: result[0].verify_seller,
            mobile:
              typeof user == "undefined" ? "**********" : result[0].mobile,
              image: `${result[0].image}`,
            veryfy_seller: result[0].admin_verification,
          });

          // get item data from database
          const sql = `SELECT items.item_id, items.seller_id, items.C_ID, items.SC_ID, items.name, items.unit, items.unit_price, items.description, items.add_date, items.expire_date, items.quantity, items.image, seller_data.verify_seller FROM items inner join seller_data on items.seller_id = seller_data.seller_id WHERE items.seller_id=${result[0].seller_id}`;
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

                  if (more > 0) {
                    data2.push({
                      item_id: item.item_id,
                      seller_id: item.seller_id,
                      category_id: item.C_ID,
                      sub_category_id: item.SC_ID,
                      name: item.name,
                      unit: item.unit,
                      unit_price: item.unit_price,
                      description: item.description,
                      add_date: item.add_date,
                      verify_seller: item.verify_seller,
                      moreTime: more,
                      quantity: item.quantity,
                      image: `${item.image}`
                    });
                  }
                });
                console.log("send data");

                res.send({ data1, data2 });
                return;
              } else {
                res.send({ data1, data2 });
                return;
              }
            }
          });
        } else {
          res.send("store name not found");
          return;
        }
      }
    });
    return;
  }
});

module.exports = router;
