
import dotenv from'dotenv';
import express from "express";
const app = express();
const router = express.Router();
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import bcrypt from "bcrypt";
import initializePassport from "../passport-config.js";
import accountModels from "../models/auth.model.js";

router.use(flash());


const userRegister=[];
let users = await accountModels.findAllEmail();
router.use(passport.initialize());

initializePassport.initialize(
    passport,
    email => users.forEach(u=>{u=u.email})
);

router.use(passport.session());

router.get("/login", async (req, res) => {
    users.splice(0, users.length)
    const a= await accountModels.findAllEmail();
    a.forEach(item => {
        users.push(item)
    })
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register")
});
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function(req, res) {
        /*successRedirect: "/success",*/
        res.redirect('/success');

});

router.post("/register", async (req, res) => {
    let flag = false;
    users.forEach(u => {
        u = u.email
        if (u == req.body.email) {
            flag = true;
        }
    })
    console.log("flag" + flag)
    if (flag == true) {
        return res.redirect("/register")
    }
    else if(flag==false){
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        userRegister.push({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        await accountModels.insertAccount(req.body.email, hashedPass, req.body.name);
        return res.redirect("/login")
    }
});
router.get("/success", async (req,res)=>{
    try {
        res.render("home")
    }
    catch (err){
        res.sendStatus(401);
    }
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect("/");
});



export default router;
