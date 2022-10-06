const mysql = require("mysql");
const bcrypt = require("bcryptjs");


const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
});
exports.login = ((req, res) => {
try{
    let {email, password} = req.body;
    if(!email || !password){
        return res.status(400).render("index", {
            msg: " ⚠️ Please enter your email and Password", 
            msg_type : "error"
        })
    }

    db.query(
        'select * from users where email=?', 
        [email], 
        async(error, result) => {
            console.log("result " +result[0].PASS);
            if(result.length <= 0){
                return res.status(401).render("index", {
                    msg: " ⚠️ Please enter your email and Password", 
                    msg_type : "error"
            });
        }else{
            if(!(await bcrypt.compare(password, result[0].PASS))){
                ///console.log(bcrypt.compare(password, result[0].PASS));
                return res.status(401).render("index", {
                    msg: " ⚠️ Incorrect email and Password", 
                    msg_type : "error"
                });
            }else{
                console.log("login Sucessfull");
            }
        }
    }
    );
}
    
catch(error){
    console.log(error)
}
});
exports.register = ((req, res) => {
    //console.log(req.body);
    //let r = req.body
    //let name = r.name;
    //let email = r.email;
    //let password = r.password;
    //let confirm_password = r.confirm_password;
    let {name, email, password, confirm_password} = req.body;
    db.query('select email from users where email=?', [email], async(error, result) => {
        if(error){
            confirm.log(error);
        }
        console.log(result);
        if(name.length <= 0 || email.length <=0 || password.length <= 0 || confirm_password.length <= 0 ){
            console.log(name);
            return res.render('register', {msg :" ❌ Please fill all the fields ", msg_type:"error"})
        }
        if(result.length > 0){
            return res.render('register', {msg :" ❌ Email Id is already taken", msg_type:"error"})
        }else if(password!==confirm_password){
            return res.render('register', {msg :" ❌ password doesn't match", msg_type:"error"})
        }
        let hashedPassword =await bcrypt.hash(password, 8);
        //console.log(hashedPassword);

            db.query("insert into users set ?", {name:name, email:email,pass:hashedPassword}, 
            (error, result) => {
                if(error){
                    console.log(error);
                }else{
                    //console.log(result)
                    return res.render('register', {msg :" ✔️ successfully registered", msg_type:"good"});
                }
            });
    });
});