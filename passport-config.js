import local from "passport-local";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authModel from './models/auth.model.js'

var localStrategy = local.Strategy;
export default {
  async initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
      const user = email
      let flag=false;
      let listUser= await authModel.findAllEmail()
      listUser.forEach(item => {
        item=item.email
        if(item===user){
          flag=true;
        }
        console.log("Item"+item)
        console.log("User"+user)
      })
      if ((user == null)  || (flag==false)) {
        return done(null, false, { message: "No user with that email" });
      }
      try {
        let password_temp=await authModel.findPasswordByEmail(user)
        password_temp=password_temp[0].password
        console.log("password"+password)
        console.log(password_temp)
        if (await bcrypt.compare(password,password_temp)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    };
    passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((email, done) => {
      return done(null, email);
    });
  }
};

