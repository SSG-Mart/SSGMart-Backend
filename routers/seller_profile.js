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
    console.log(store_name_from_client_side);

    //validate request authorized
    let currentSessionID;
    const {user} = req.session;
    if(typeof(user) != 'undefined'){
        //if user is authorized ?
        create_response_for_authorized_request((user.userID).toString(), store_name_from_client_side);
        currentSessionID = (user.userID).toString();
    }
    else{
        currentSessionID = "User Not login"
    }
    
    res.send(`From backend: ${currentSessionID}`);
    
})



module.exports = router;