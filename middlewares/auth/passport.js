import local from "passport-local";
import bcrypt from "bcrypt";
import shoppingModel from "../../models/shopping.model.js";

var localStrategy = local.Strategy;

export default {
  async initialize(passport, getUserByEmail, getUserById) {
      const authenticateUser = async (email, password, done) => {
          const user = await getUserByEmail(email);
          if (user == null) {
              return done(null, false, {message: "No user with that email"});
          }
          try {
              if (await bcrypt.compare(password, user.password)) {
                  return done(null, user);
              } else {
                  return done(null, false, {message: "Password incorrect"});
              }
          } catch (e) {
              return done(e);
          }
      };
      passport.use(
          new localStrategy({usernameField: "email"}, authenticateUser)
      );
      passport.serializeUser((user, done) =>
          done(null, {
              id: user.UserID,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              address: user.address,
              phonenumber: user.phonenumber,
              type: user.type,
              image: user.image,
              dob:user.dob
          }),
      );
      passport.deserializeUser((user, done) => done(null, getUserById(user.id)));
  },
};
