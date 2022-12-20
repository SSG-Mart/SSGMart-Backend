const mysql = require('mysql');

try{
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ssg_mart"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}
catch{
  console.log("Can't connect DB..");
}

module.exports = con;

