import passport from "passport";
import bcrypt from "bcrypt";
import initializePassport from "../auth/passport-config.js";
import validator from "express-validator";

const { body, validationResult } = validator;

initializePassport.initialize(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const registerView = (req, res) => {
  res.render("register", {
    error_message: req.session.message,
  });
  req.session.message = "";
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.message = errors.errors[0].msg;
    res.redirect("/register");
    return;
  }
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
  res.render("login", {
    error_message: req.session.message,
  });
  req.session.message = "";
};

const loginUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.message = errors.errors[0].msg;
    res.redirect("/login");
    return;
  }
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res);
};

const authValidation = (method) => {
  switch (method) {
    case "registerUser": {
      return [body("name", "Username is empty").exists()];
    }
    case "loginUser": {
      return [body("name", "Username is empty").exists()];
    }
  }
};

export { registerView, loginView, registerUser, loginUser, authValidation };
