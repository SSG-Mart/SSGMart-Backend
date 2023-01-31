const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");

const authRoute = require('./routers/auth');
const homeRoute = require('./routers/home');
const sellerProfileRoute = require('./routers/seller_profile');
const addItemRoute = require('./routers/add_item');
const crudRoute = require('./routers/crud_item')
const imageReturnRoute = require('./routers/image_return')
const sellerDashboardRoute = require('./routers/seller_dashboard')
const imageUpload = require('./routers/image_upload')
const becomeASellerRoute = require('./routers/become_a_seller')
const categoryRoute = require('./routers/category')
const userDataRoute = require('./routers/userData')

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/api/cruditem', crudRoute);
app.use('/api/img', imageReturnRoute);
app.use('/api/dashboard', sellerDashboardRoute);
app.use('/api/imgupload', imageUpload);
app.use('/api/become', becomeASellerRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userDataRoute);



app.listen(port, () => {
    console.log(`Running Express Server On PORT ${port}`);
}) 