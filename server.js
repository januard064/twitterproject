const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
// const pool = require("./db");
// const res = require('express/lib/response');
const validInfo = require('./middleware/validInfo')

//middleware
app.use(cors())
app.use(express.json())


const authRouter = require('./routes/Auth')
const tweetRouter = require('./routes/Tweets')
app.use('/auth', authRouter)
app.use('/tweets', tweetRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})