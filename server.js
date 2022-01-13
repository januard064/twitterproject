const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
// const pool = require("./db");
// const res = require('express/lib/response');

//middleware
app.use(cors())
app.use(express.json())

//get user data
// app.get("/twitteruser", async (req, res) => {
//   try {
//     const allUser = await pool.query("SELECT * FROM usertwitter")
//     res.json(allUser.rows)
//   } catch (err) {
//     console.log(err.message)
//   }
// })





// app.get('/api/customers', (req, res) => {
// //   res.send('Hello World!')
//     const customers = [
//         { id: 1, firstName: 'Jhon', lastName : 'Doe' },
//         { id: 2, firstName: 'Emma', lastName : 'Watson' },
//         { id: 3, firstName: 'Mary', lastName : 'Swanson' }
//     ];
//     res.json(customers);
// });


const authRouter = require('./routes/Auth')
const tweetRouter = require('./routes/Tweets')
app.use('/auth', authRouter)
app.use('/tweets', tweetRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})