const express = require("express");
const router = express.Router()
const pool = require("../db");

const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

const jwtGenerator = require('../utils/jwtGenerator')

const bcrypt = require('bcrypt')

//register-post data
router.post("/register",validInfo, async (req, res) => {
    try {
      
      // destruct req.body
      const {email, user_name ,password} = req.body

      // check user exist in database (if the user has already exist throw to error)
      const user =  await pool.query("SELECT * FROM newuser WHERE email = $1", [email])

      if(user.rows.length !== 0){
       return res.status(401).json("user has already exist")
      }

      //bcrypt password
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)

      const bcryptPassword = await bcrypt.hash(password, salt)

      //enter new user to database
      const newUser = await pool.query("INSERT INTO newuser(email, user_name ,password) VALUES($1, $2, $3) RETURNING *", [email, user_name, bcryptPassword])

      //generate jwt token
      const token = jwtGenerator(newUser.rows[0].user_id);

      res.json({token})

      // res.json(newUser.rows)
    } catch (err) {
     console.log(err.message) 
     res.status(500).send("server error")
    }
  })
  
  
  
  
  //for Login
  router.post("/login",validInfo, async(req, res) => {
     
      try {
         // destructur req.body
        const { email, password} = req.body

        // check if user exist
        const user = await pool.query("SELECT * FROM newuser WHERE email = $1", [email])
        if(user.rows.length === 0){
          return res.status(401).json("account does not exist")
        }

        // check if incoming password is the same with passwotd in dtabase
        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        // console.log(validPassword)
        if(!validPassword){
          return res.status(401).json('Password or email is incorrect')
        }

        // genrate token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
        
      } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
      }

     
  
  })


  // get usrdata  which will be sent or mke data to public
  router.get("/userdata", authorization, async (req, res) => {
    try {

      const user = await pool.query("SELECT user_name FROM newuser WHERE user_id = $1",[req.user])

      res.json(user.rows[0])

    } catch (err) {
      console.error(err.message)
      res.status(500).json("server error")
    }
  })



// use for verify the jwt - make jwt authorized even if the page is refreshed
// using funcion authorization that define at the other file
  router.get("/is-verify", authorization ,async(req, res) => {
    try {
      res.json(true)
      
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  })

  module.exports = router