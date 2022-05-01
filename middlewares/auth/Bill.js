import bcrypt from "bcrypt";

let temp=0;
export default {

    setvalue(id) {
        temp=id;
    },
    getValue(){
        return temp;
    }
};
