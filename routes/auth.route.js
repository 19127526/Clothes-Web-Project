
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
    if (flag == true) {
        return res.redirect("/register")
    }
    else if(flag==false){
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        userRegister.push({
            name: req.body.firstname + req.body.lastname,
            email: req.body.email,
            password: hashedPass
        })
        await accountModels.insertAccount(req.body.email, hashedPass,req.body.lastname
        ,req.body.firstname,req.body.dateofbirth,req.body.address,req.body.phonenumber);
        return res.redirect("/login")
    }
});
router.get("/success", async (req,res)=>{
    try {
        res.redirect('/');
    }
    catch (err){
        res.sendStatus(401);
    }
})

router.get('/logout', function(req, res) {
    req.logout();
    const url=req.headers.referer||"/"
    res.redirect(url);
});

router.get('/profile', function(req, res) {
    res.render('profile')
});
router.post("/updateprofile", async function (req,res){
    accountModels.updateAccount(req.body)
    res.redirect("/profile")
});



export default router;
