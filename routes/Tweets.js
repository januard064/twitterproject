const express = require("express");
const router = express.Router()
const pool = require("../db");
const res = require('express/lib/response');


//post twitter
router.post("/", async (req, res) => {
    try {
      const { tweets, tweets_time, tweets_name, tweets_email } = req.body.tweet;
      const newTweet = await pool.query("INSERT INTO tweet(tweets, tweets_time, tweet_name, tweet_email) VALUES($1, $2, $3, $4) RETURNING *",
      [tweets, tweets_time, tweets_name, tweets_email])
      
      res.json(newTweet.rows[0]);
      console.log(`berhasil`,req.body)
    } catch (err) {
      console.log(err.message)
    }
  })
  
  
  //get all tweet list
  router.get("/", async (req, res) => {
    try {
      const allTweet = await pool.query("SELECT * FROM tweet")
      res.json(allTweet.rows)
    } catch (err) {
      console.log(err.message)
    }
  })
  
  //get a tweet
  router.get("/:id", async(req, res) => {
    try {
      const { id } = req.params
      const tweet = await pool.query("SELECT * FROM tweet WHERE tweet_id = $1", [id])
  
      res.json(tweet.rows[0])
    } catch (err) {
      console.log(err.message)
    }
  })
  
  //deleteTweet
  router.delete("/:id", async(req, res) => {
    try {
      const { id } = req.params;
      const deleteTweet =  await pool.query("DELETE FROM tweet WHERE tweet_id = $1", [id])
      res.json("Tweet berhasil dihapus")
    } catch (err) {
      err.message
    }
  })
  
  
  //update tweet
  router.put("/:id", async(req, res)=> {
    try {
      const {id} = req.params
      const { tweets, tweets_time, tweets_name, tweets_email } = req.body.tweet;
      const updateTweet = await pool.query(
        "UPDATE tweet SET tweets = $1 WHERE tweet_id = $2", [tweets, id]
      );
  
      res.json("berhasil update tweet") 
    } catch (err) {
      console.log(err.message)
    }
  })

  module.exports = router
  