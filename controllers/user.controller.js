import usersModel from "../models/users.model.js";

const profileView = async function (req, res) {
  res.render("profile");
};

const profileChange = async function (req, res) {
  try {
    await usersModel.updateAccount(req.session.passport.user.id, req.body);
    req.locals.user = req.session.passport.user;
  } catch (err) {}
  res.redirect("/profile");
};

export { profileView, profileChange };
