const { Router } = require("express");
const router = Router();
const con = require("../config/Connection");


router.use((req, res, next) => {
    const { user } = req.session;
    if (user) {
        next();
    }
    else{
        res.send("login first");
    }
})

router.post("/", (req, res) => {
    const sql = `SELECT f_name, l_name, user_name, email, mobile, address_one, district_id FROM user_data WHERE M_ID=${req.session.user.userID}`;
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.send(result[0]);
        }
    })
})

router.post("/update", (req, res) => {
    const sql = ` WHERE M_ID=${req.session.user.userID}`;
    console.log(req.body);
    const {f_name} = req.body;
    const {l_name} = req.body;
    const {mobile} = req.body;
    const {address_one} = req.body;
    const {city} = req.body;

    if(f_name && l_name && mobile && address_one && city){
        const sql = `UPDATE user_data SET f_name='${f_name}', l_name='${l_name}', mobile='${mobile}', address_one='${address_one}', district_id='${city}' WHERE M_ID=${req.session.user.userID}`;
        con.query(sql, (err, result) => {
            if(err){
                throw err;
            }
            else{
                console.log(result);
                if(result.affectedRows === 1){
                    res.send("updated");
                }
            }
        })
    }
    else{
        res.send("fill all the fields");
    }
    
})

router.get("/wish-list", (req, res) => {
    req.session.user.userID
    const {userID} = req.session.user
    
    if(!userID) return res.send("login first");

    const sql = `select wish_list.*, items.*, user_data.f_name, user_data.image as user_image, district.name as city, seller_data.store_name, seller_data.verify_seller from wish_list
    inner JOIN items on wish_list.item_id = items.item_id
    inner JOIN seller_data on seller_data.seller_id = items.seller_id
    INNER JOIN user_data on user_data.M_ID = seller_data.M_ID
    inner join district on user_data.district_id = district.district_id
    WHERE CURRENT_TIMESTAMP() < CONVERT_TZ(STR_TO_DATE(items.expire_date, '%a %b %d %Y %H:%i:%s'), '+00:00', '+05:30') and wish_list.M_ID=${userID}`

    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        else{
            var data = []

            if(result.length > 0){

                data = result.map(item => {
                    let today = new Date();
                    let expire_date = new Date(item.expire_date);
                    const more = expire_date - today;

                    if (more > 0) {

                            return {
                                item: {
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
                                    image: `${item.image}`,
                                    like: true
                                },
                                user_data: {
                                    image: item.user_image,
                                    store_name: item.store_name,
                                    verify_seller: item.verify_seller,
                                    city: item.city,
                                }
                            }
                        }
                        })
                    }
                    
            console.log(data);
            res.send(data);
        }
    })
})


module.exports = router;
