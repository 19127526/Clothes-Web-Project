import usersModel from "../models/users.model.js";

const profileView = async function (req, res) {
  res.render("profile");
};

const profileChange = async function (req, res) {
  const promise=new Promise(async (resolve, reject) => {
    const list = await usersModel.updateAccount(req.session.passport.user.id, req.body);
    resolve("done")
  });
  promise.then(function (){
    res.redirect("/profile");
  })


};

export { profileView, profileChange };
