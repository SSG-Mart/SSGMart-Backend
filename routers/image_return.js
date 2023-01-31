const { Router } = require("express");
const router = Router();
const con = require("../components/Connection");
const fs = require("fs");
const path = require("path");

//send user image using image name
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

//send user image using userID
router.get("/user/userID/:id", (req, res) => {
  const query = `SELECT image FROM user_data user WHERE M_ID = '${req.params.id}'`;
  con.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length > 0) {
        const { image } = result[0];

        const id = image;
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
                res.send("Canot read file..");
                return;
              }
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(data);
            });
          }
        });
      }
      else{
        res.send("User doesn't exist..");
      }
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
