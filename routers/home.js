const {Router} = require('express');
const router = Router();



router.use((req, res, next) => {
    if(req.session.user) next();
    else res.send("Home page");
  });

router.post("/", (req, res) => {
  res.send("Authenticated Homepage");
})



module.exports = router;