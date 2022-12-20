const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const authRoute = require('./routers/auth');
const homeRoute = require('./routers/home');
const sellerProfileRoute = require('./routers/seller_profile');
const addItemRoute = require('./routers/add_item');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: 'JDOQHFZSHFLMNUWFHXHBFUIVEBZVUHUIEFKLHJVDDLAOI',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60,
    }
}));


// Print called API path
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
});


app.use('/api/auth', authRoute);
app.use('/api/home', homeRoute);
app.use('/api/seller', sellerProfileRoute);
app.use('/api/additem', addItemRoute);


app.listen(port, () => {
    console.log(`Running Express Server On PORT ${port}`);
})