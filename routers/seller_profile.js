const {Router} = require('express');
const router = Router();
const con = require("../components/Connection");


// Authorized but different user
const get_data_for_own_store = (userID, sellerID) => {
    const data = {
        
    }
}

// Authorized user request his own store
const get_data_for_requester_store_not_own = (userID, sellerID) => {
    const data = {
        
    }
}


const create_response_for_authorized_request = (userID, storeName) => {
    console.log(`user ID: ${userID}`);
    console.log(`Store Name: ${storeName}`);

    // Check request data for own store
    const sql = `SELECT * FROM seller_data WHERE store_name = '${storeName}'`
    try{
        con.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return false
            }
            else{
                if(result.length > 0){
                    let M_ID_for_store = result[0].M_ID.toString();
        
                    if(M_ID_for_store === userID){
                        // console.log("UserID and Store Name is same");
                        get_data_for_own_store(userID, result[0].seller_id.toString()); //Called function
                    }else{
                        // console.log("UserID and Store Name is from DIFFERENT");
                        get_data_for_requester_store_not_own(userID, result[0].seller_id.toString()); //Called function
                    }
                }
                else{
                    console.log("store not found");
                    return "store not found";
                }
                
            }     
        });
    }
    catch{
        console.log("Bad Request..");
        return "Bad Request";
    }
}

router.post("/", (req, res) => {

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
                            mobile: result[0].mobile,
                            // R_admin_id: result[0].R_admin_id,
                            // R_reasan: result[0].R_reasan
                            
                        });

                        // get item data from database
                        const sql = `SELECT item_id, seller_id, C_ID, SC_ID, name, unit, unit_price, description, add_date, quantity, image FROM items WHERE seller_id=${result[0].seller_id}`;
                        con.query(sql,(err, result) => {
                            if(err){
                                console.log(err);
                                res.send('database error');
                                return;
                            }
                            else{
                                console.log(result.length)
                                if(result.length > 0){
                                    result.forEach((item) => {
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
                                            quantity: item.quantity,
                                            image: `${item.image}`,
                                        });
                                    });
                                    console.log("send data");
                                    console.log({data1,data2});

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