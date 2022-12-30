const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");

//send user image
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  let img = path.join(__dirname, "..", "img", "user", `${id}`);

  fs.access(img, fs.F_OK, (err) => {
    if (err) {
      console.error("Image doesn't exist.., err: " + err);
      res.send("Image doesn't exist..");
      return;
    } else {
      fs.readFile(img, (err, data) => {
        if (err) {
          console.error(err);
          res.send("Image doesn't exist..");
          return;
        }
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      });
    }
  });
});

//send item image
router.get("/item/:id", (req, res) => {
  const id = req.params.id;
  let img = path.join(__dirname, "..", "img", "item_image", `${id}`);

  fs.access(img, fs.F_OK, (err) => {
    if (err) {
      console.error("Image doesn't exist.., err: " + err);
      res.send("Image doesn't exist..");
      return;
    } else {
      fs.readFile(img, (err, data) => {
        if (err) {
          console.error(err);
          res.send("Image doesn't exist..");
          return;
        }
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      });
    }
  });
});

//send NIC image
router.get("/nic/:id", (req, res) => {
  const id = req.params.id;
  let img = path.join(__dirname, "..", "img", "nic", `${id}`);

  fs.access(img, fs.F_OK, (err) => {
    if (err) {
      console.error("Image doesn't exist.., err: " + err);
      res.send("Image doesn't exist..");
      return;
    } else {
      fs.readFile(img, (err, data) => {
        if (err) {
          console.error(err);
          res.send("Image doesn't exist..");
          return;
        }
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      });
    }
  });
});

module.exports = router;
