import usersModel from "../models/users.model.js";

const profileView = async function (req, res) {
  res.render("profile");
};

const profileChange = async function (req, res) {
  usersModel.updateAccount(req.session.passport.user.UserID, req.body);
  res.redirect("/profile");
};

export { profileView, profileChange };
