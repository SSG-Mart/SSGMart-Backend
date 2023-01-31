const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");


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


module.exports = router;
