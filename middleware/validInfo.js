module.exports = (req, res, next) => {
    const {email, user_name, password} = req.body

    function validEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if(req.path === "/register"){
        if(![email, user_name, password].every(Boolean)){
            return res.status(401).json("Missing Credential")
        } else if(!validEmail(email)){
            return res.status(401).json("invalid email")
        }
    } 
    else if(req.path === "/login"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credential")
        } else if(!validEmail(email)){
            return res.status(401).json("invalid email")
        }
    }
    next()
}