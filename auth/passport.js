import local from "passport-local";
import bcrypt from "bcrypt";

var localStrategy = local.Strategy;

export default {
  initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
      const user = await getUserByEmail(email);
      if (user == null) {
        return done(null, false, { message: "No user with that email" });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    };
    passport.use(
      new localStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) =>
      done(null, {
        id: user.UserID,
        email: user.email,
        name: user.name,
        type: user.type,
      })
    );
    passport.deserializeUser((user, done) => done(null, getUserById(user.id)));
  },
};
