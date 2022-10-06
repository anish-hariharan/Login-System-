let express = require("express");
let router = express.Router();

router.get("/", ((req, res) => {
    //res.send("<h1>Hello</h1>");
    res.render("index");
}))

router.get("/register", ((req, res) => {
    res.render("register")
}));

router.get("/profile", ((req, res) => {
    res.render("profile")
}))

router.get("/home", ((req, res) => {
    res.render("home");
}))

module.exports = router;