const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require('hbs');

dotenv.config({
    path:'./.env'
})

const app = express();

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
});

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("My Sql Access is Success");
    }
});

app.use(express.urlencoded({extended:false}));

//console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set('view engine', 'hbs');

const partialspath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialspath);
////

app.use('/', require('./routes/routes'));
app.use("/auth", require("./routes/auth"));

////
app.listen(3000, () => {
    console.log("server is running")
});
