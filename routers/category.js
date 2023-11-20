const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");

router.post("/", (req, res) => {
  
});

router.get("/", (req, res) => {
  const sql = `select * from category`;
  con.query(sql, (err, result) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(result);
  });
});

router.get("/sub-category/:main_category_id", (req, res) => {
  const { main_category_id } = req.params;

  if(!main_category_id) return res.status(400).json({ error: "main_category_id is required" });

  const sql = `SELECT * from sub_category WHERE C_ID = ${main_category_id}`;

  con.query(sql, (err, result) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(result);
  });
});





module.exports = router;
