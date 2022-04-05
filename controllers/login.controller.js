import passport from "passport";
import bcrypt from "bcrypt";
import initializePassport from "../auth/passport.js";
import validator from "express-validator";
import usersModel from "../models/users.model.js";

const { body, validationResult } = validator;

initializePassport.initialize(
  passport,
  (email) => usersModel.getUserByEmail(email),
  (id) => usersModel.getUserById(id)
);

const authValidation = (method) => {
  switch (method) {
    case "registerUser":
    case "loginUser": {
      return [
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Password must be at least 8 characters")
          .exists()
          .isLength({ min: 8 }),
      ];
    }
  }
};

const registerView = (req, res) => {
  res.render("register", {
    error_message: req.session.reg_err,
  });
  delete req.session.reg_err;
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.reg_err = errors.errors[0].msg;
    res.redirect("/register");
    return;
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await usersModel.insertAccount(req.body);
    res.redirect("/login");
  } catch (err) {
    switch (err) {
      case 1062:
        req.session.reg_err = "Email already exists. Please use another one.";
        break;
      case 1452:
      case 1451:
        req.session.reg_err = "Database error. Please try again later.";
        break;
      default:
        req.session.reg_err =
          "Unknown error. Please contact us with error: " + err;
    }
    res.redirect("/register");
  }
};

const loginView = (req, res) => {
  res.render("login", {
    error_message: req.session.login_err,
  });
  delete req.session.login_err;
};

const loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.login_err = errors.errors[0].msg;
    res.redirect("/login");
    return;
  }
  const redirect = req.session.returnTo || "/";
  delete req.session.returnTo;
  passport.authenticate("local", {
    successRedirect: redirect,
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

export { registerView, loginView, registerUser, loginUser, authValidation };
