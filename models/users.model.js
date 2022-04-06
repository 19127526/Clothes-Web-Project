import db from "../utils/db.js";

export default {
  async insertAccount(user) {
    try {
      await db("users").insert({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        phonenumber: user.phonenumber,
        address: user.address,
      });
    } catch (err) {
      throw err.errno;
    }
  },
  async updateAccount(Id, user) {
    try {
      await db("users").where("UserID", Id).update({
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
        address: user.address,
      });
    } catch (err) {
      throw err.errno;
    }
  },
  async getUserByEmail(Email) {
    try {
      const user = await db("users").where("email", Email);
      return user[0];
    } catch (err) {
      throw err.errno;
    }
  },
  async getUserById(Id) {
    try {
      const user = await db("users").where("UserID", Id);
      return user[0];
    } catch (err) {
      throw err.errno;
    }
  },
};
