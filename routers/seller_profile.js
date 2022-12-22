const {Router} = require('express');
const router = Router();
const con = require("../components/Connection");

router.post("/", (req, res) => {
    const {user} = req.session;
    console.log(user);
    //Get store name from client side
    const store_name_from_client_side = req.body.store_name;
    // console.log(store_name_from_client_side);

        if(store_name_from_client_side == typeof('undefined')){
            res.send('store name not found');
            return;
        }else{
            //get data from database
            let data1 = []
            let data2 = []
            
            const sql = `select seller_data.*, user_data.mobile, user_data.image, district.name from seller_data INNER JOIN user_data on seller_data.M_ID=user_data.M_ID INNER JOIN district on user_data.district_id=district.district_id WHERE seller_data.store_name='${store_name_from_client_side}'`;
            con.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    res.send('database error');
                    return;
                }
                else{
                    if(result.length > 0){
                        // console.log(result);
                        data1.push({
                            seller_id: result[0].seller_id,
                            // M_ID: result[0].M_ID,
                            // A_admin_id: result[0].A_admin_id,
                            C_ID: result[0].C_ID,
                            store_name: result[0].store_name,
                            ratings: result[0].ratings,
                            // nic: result[0].nic,
                            // nic_image: `img/${result[0].image}`,
                            A_Status: result[0].A_Status,
                            date_of_register: result[0].date_of_register,
                            city: result[0].name,
                            mobile: typeof(user) == 'undefined' ? "**********" : result[0].mobile,
                            // R_admin_id: result[0].R_admin_id,
                            // R_reasan: result[0].R_reasan
                            
                        });

                        // get item data from database
                        const sql = `SELECT item_id, seller_id, C_ID, SC_ID, name, unit, unit_price, description, add_date, expire_date, quantity, image FROM items WHERE seller_id=${result[0].seller_id}`;
                        con.query(sql,(err, result) => {
                            if(err){
                                console.log(err);
                                res.send('database error');
                                return;
                            }
                            else{
                                // console.log(result.length)
                                if(result.length > 0){
                                    result.forEach((item) => {

                                        let today = new Date();
                                        let expire_date = new Date(item.expire_date);
                                        const more = expire_date - today.getTime();
                                        
                                        if(more > 0){
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
                                                moreTime: more,
                                                quantity: item.quantity,
                                                image: `${item.image}`,
                                            });
                                        }
                                    });
                                    console.log("send data");
                                    // console.log({data1,data2});

                                    res.send({data1,data2});
                                    return;
                                }
                                else{
                                    res.send({data1,data2});
                                    return;
                                }
                            }
                        });
                        
                    }
                    else{
                        res.send('store name not found');
                        return;
                    }

                }
            });
            // res.send('store name found')
            return;
        }





        // currentSessionID = "User Not login"

    
    // res.send(`From backend: ${currentSessionID}`);
    
})



module.exports = router;