const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return next();
  }
  req.session.login_err = "Please login to continue";
  res.redirect("/login");
};

const protectAdminRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.session.passport.user.type === 1) {
      req.session.returnTo = req.originalUrl;
      next();
    } else {
      req.session.login_err = "You are not an admin";
      res.redirect("/login");
    }
  } else {
    req.session.login_err = "Please login to continue";
    res.redirect("/login");
  }
};

export { protectRoute, protectAdminRoute };
