const jwt = require('jsonwebtoken');
const auth = require("../config/constaint");

const generateToken = (id) => {
    const data = {
        userId: id
    };

    const token = jwt.sign(data, auth.obj.auth);
    return token;
};


// const jwtvalidation = (req, res, next) => {
//     let token = req.headers.authorization;
//     token = token.split('Bearer')[1];
//     const match = jwt.verify( auth.obj.auth,token,);
//     if (match) {
//         next()
//     } else {
//         return res.status(400).send({massage:"bearer token not have correct"});
//     }
// }


const jwtvalidation = (req, res, next) => {
    try {
        // Extract token from Authorization header
        let token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ message: "Authorization token not provided" });
        }

        // Extract the token part
        token = token.split('Bearer ')[1].trim();

        // Verify the token
        const decoded = jwt.verify(token, auth.obj.auth); // Assuming auth.obj.auth contains the secret key
        if (decoded) {
            next(); // Move to the next middleware
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { generateToken, jwtvalidation };