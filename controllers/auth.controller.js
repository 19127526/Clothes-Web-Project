import passport from "passport";
import bcrypt from "bcrypt";
import initializePassport from "../auth/passport-config.js";

initializePassport.initialize(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const registerView = (req, res) => {
    res.render("register");
};

const registerUser = async (req, res) => {
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
};

const loginView = (req, res) => {
    res.render("login");
};

const loginUser = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res);
};

export {
    registerView,
    loginView,
    registerUser,
    loginUser,
};