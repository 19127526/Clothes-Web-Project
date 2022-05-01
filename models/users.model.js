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
      const list=await db("users").where("UserID", Id).update({
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber,
        address: user.address,
        dob:user.dob
      });
      return list;
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
  findTotalAccount(){
    return db("users").count('users.email', {as: 'total'});
  },
  async findAllAccount(page, perPage) {
    let pagination = {};
    const total = await db("users").count('* as count').first();
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    const offset = page - 1;

    const listProduct = await db("users").join('statususer','statususer.IdStatus','users.type').limit(perPage).offset(offset * perPage);
    return { pagination, listProduct };
  },
  async findAllAcount(){
    const listProduct = await db("users").join('statususer','statususer.IdStatus','users.type');
    return listProduct
  },
  async updateAvatar(userid,dir){
    const link="https://encinver.sirv.com/profile/"+dir;
    console.log(link);
    console.log("userid"+userid)
    const list= await db("users").where("users.UserID", userid).update({
      image:link.toString()
    });
    return list;
  }
  /*async findAllAccount(){
    const list=await db('users').select('users.*');
    return list
  },*/
};
