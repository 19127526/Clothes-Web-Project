import db from "../utils/db.js";

export default {
  async insertAccount(
    Email,
    Password,
    Firstname,
    Lastname,
    DateofBirth,
    Address,
    Phonenumber
  ) {
    try {
      await db("users").insert({
        email: Email,
        password: Password,
        firstname: Firstname,
        lastname: Lastname,
        phonenumber: Phonenumber,
        address: Address,
        dob: DateofBirth,
      });
    } catch (err) {
      throw err.errno;
    }
  },
  async updateAccount(Id, user) {
    try {
      await db("users").where("email", Id).update(user);
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
