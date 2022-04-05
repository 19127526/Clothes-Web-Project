import db from "../utils/db.js";

export default {
    insertAccount(Email,Password,Lastname,Firstname,Dateofbirth,Address,Phonenumber){
        return db('users').insert({email:Email,password:Password,firstname:Firstname,lastname:Lastname,
        phonenumber:Phonenumber,address:Address,dateofbirth:Dateofbirth});
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
    async updateAccount(user) {
        const Email=user.email
        const Firstname=user.firstname
        const Lastname=user.lastname
        const Phone=user.phonenumber
        const Address=user.address
        const DOB=user.dateofbirth
        return db('users').where('email',Email).update(user)
    },
};