const express = require("express");
const router = express.Router()
const pool = require("../db");

const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

const jwtGenerator = require('../utils/jwtGenerator')

const bcrypt = require('bcrypt')

//register-post data
router.post("/register",validInfo, async (req, res) => {
    // try {
    //   const { email, password } = req.body.user;
    //   const newUser = await pool.query("INSERT INTO usertwitter(email, password) VALUES($1, $2) RETURNING *",
    //   [email, password])
      
    //   res.json(newUser.rows[0]);
    //   console.log(`berhasil`,req.body)
    // } catch (err) {
    //   console.log(err.message)
    // }

    try {
      
      // destruct req.body
      const {email, user_name ,password} = req.body

      // check if user exist
      const user =  await pool.query("SELECT * FROM newuser WHERE email = $1", [email])

      // res.json(user.rows)
      if(user.rows.length !== 0){
       return res.status(401).send("user has already exist")
      }

      //bcrypt password
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)

      const bcryptPassword = await bcrypt.hash(password, salt)

      //enter new user
      const newUser = await pool.query("INSERT INTO newuser(email, user_name ,password) VALUES($1, $2, $3) RETURNING *", [email, user_name, bcryptPassword])

      //generate our jwt token
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
      // const { email, password } = req.body.user;
      // const user = await pool.query("SELECT * FROM usertwitter WHERE email=$1 and password=$2", [email, password])
      
      // if(user.rows.length > 0){
      //   // res.json();
      //   res.send(user)
      //   console.log(`terdaftar`, user.rows[0])
      // } else{
      //   console.log("tidak terdaftar")
      //   res.send('notvalid')
      // }
      try {
         // destructur req.body
        const { email, password} = req.body

        // check if user exist
        const user = await pool.query("SELECT * FROM newuser WHERE email = $1", [email])
        if(user.rows.length === 0){
          return res.status(401).send("password or email is incorrect")
        }

        // check if incoming password is the same with passwotd in dtabase
        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        // console.log(validPassword)
        if(!validPassword){
          return res.status(401).json('password or email is incorrect')
        }

        // genrate token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
        
      } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
      }

     
  
  })

  router.get("/is-verify", authorization ,async(req, res) => {
    try {
      res.json(true)
      
    } catch (err) {
      console.log(err.message)
      res.status(500).send('server error')
    }
  })

  module.exports = router