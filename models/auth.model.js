import db from "../utils/db.js";

export default {
    insertAccount(Email,Password,Name){
        return db('users').insert({email:Email,password:Password,fullname:Name});
    },
    async findFullNameByEmail(email){
        const list = await db('users').where('email', email)
        return list
    },
    async findAllEmail(){
        const list = await db('users').select("users.email");
        return list
    },
     findPasswordByEmail(Email){
        return db('users').select('users.password').where('email', Email);
    },
};