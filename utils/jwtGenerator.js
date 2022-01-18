const jwt = require("jsonwebtoken");
//get all variabel in the environment
require('dotenv').config();

function jwtGenerator(user_id){
     //make user_id as unique variable for generate jwt
    const payload = {
        user: user_id
    }
    // membentuk token dengan data yang dikirimkan(payload) adalah id dari user dan secret key yang dimbil dari .env 
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60})
}

module.exports = jwtGenerator