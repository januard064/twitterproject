const express = require("express");
const router = express.Router()
const pool = require("../db");
const res = require('express/lib/response');

//register-post data
router.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body.user;
      const newUser = await pool.query("INSERT INTO usertwitter(email, password) VALUES($1, $2) RETURNING *",
      [email, password])
      
      res.json(newUser.rows[0]);
      console.log(`berhasil`,req.body)
    } catch (err) {
      console.log(err.message)
    }
  })
  
  
  
  
  //for Login
  router.post("/login", async(req, res) => {
      const { email, password } = req.body.user;
      const user = await pool.query("SELECT * FROM usertwitter WHERE email=$1 and password=$2", [email, password])
      
      if(user.rows.length > 0){
        // res.json();
        res.send(user)
        console.log(`terdaftar`, user.rows[0])
      } else{
        console.log("tidak terdaftar")
        res.send('notvalid')
      }
     
  
  })

  module.exports = router