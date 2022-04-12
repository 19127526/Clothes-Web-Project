import db from "../utils/db.js";

export default {


  async insertCommentByUserId(content,id,proid) {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const dateTemp=date + "-" + month + "-" + year;
      return db("comment").insert({'comment.userid':id,
        'comment.content':content,
        'comment.date':dateTemp,
        'comment.productid':proid
      })
  },
  async findAllComment(proID){
    const list =await db('comment').join("users","users.UserID","comment.userid").where('comment.productid',proID);
    return list
  }
};