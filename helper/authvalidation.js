const jwt=require('jsonwebtoken');
const auth=require("../config/constaint");


const generateToken = (id) => {
    const data = {
        userId: id
    };

    const token = jwt.sign(data, auth.obj.auth);
    return token;
};




module.exports={generateToken};