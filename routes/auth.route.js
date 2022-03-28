import express from "express";
const app = express();
const router = express.Router();
import passport from "passport";
import flash from "express-flash";
import session from "cookie-session";
import bcrypt from "bcrypt";
import initializePassport from "../passport-config.js";

initializePassport.initialize(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});

export default router;
