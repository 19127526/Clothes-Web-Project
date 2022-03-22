//import
import express from "express";
import morgan from 'morgan';
import activateViewMiddleware from './middlewares/view.mdw.js'
import  activateRouteMiddleware from "./middlewares/routes.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import bcrypt from 'bcrypt'
import initializePassport from './passport-config.js'

initializePassport.initialize(
    passport,
    email => users.find(user=>user.email === email),
    id => users.find(user=>user.id === id)
)
const app=express();
const port = 3000
//using
// app.use(morgan('dev'));
const users=[]
console.log(users)
app.use(express.urlencoded({
    extended: true
}));
app.use('/public',express.static('public'))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.get('/index',(req,res)=>{
    res.render('index',{name:'Kyle'})
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})


app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))
app.post('/register',async (req,res)=>{
    try{
        const hashedPass=await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPass
        })
        res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
    console.log(users)
})

//middleware
activateLocalMiddleware(app);
activateViewMiddleware(app);
activateRouteMiddleware(app);



//listen port
app.listen(port,function (){
    console.log(`Example app listening at http://localhost:${port}`)
})