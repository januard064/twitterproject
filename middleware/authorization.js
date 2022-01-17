const jwt = require("jsonwebtoken")
require("dotenv")

module.exports = async(req, res, next) => {
    try {
        //get token from header
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("Not Authorize");
        }
        //compare jwToken from input with .emv -- compoare the secret key / signature from jwToken with the signature that make in .env
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user
        next()

    } catch (err) {
        console.log(err.message)
        return res.status(403).json("Not Authorize")
    }
}