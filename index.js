const express = require('express')
const app = express();


// Print called API path
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    console.log("Trigered");
    res.send("<h1>Project Initiated...</h1>");
})

const port = 8080;
app.listen(port, () => {
    console.log(`Running Express Server On PORT ${port}`);
})