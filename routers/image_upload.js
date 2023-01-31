const { Router } = require("express");
const router = Router();
const upload = require("express-fileupload");
const con = require("../components/Connection");

router.use(upload());

router.post("/", (req, res) => {
  // console.log(req.files);
  if (req.files) {
    var file = req.files.image;
    var filename = file.name;
    var changeName = new Date().getTime() + "-" + filename;
    console.log(changeName);

    file.mv("./img/item_image/" + changeName, function (err) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(changeName);
      }
    });
  } else {
    res.send("error");
  }
});

//nic upload
router.post("/nic", (req, res) => {
  // console.log(req.files);
  if (req.files) {
    var file = req.files.image;
    var filename = file.name;
    var changeName = new Date().getTime() + "-" + filename;
    console.log(changeName);

    file.mv("./img/nic/" + changeName, function (err) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(changeName);
      }
    });
  } else {
    res.send("error");
  }
});

module.exports = router;
