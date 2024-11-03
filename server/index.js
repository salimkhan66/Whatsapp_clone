const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()
require("./db/connection")
const port = process.env.PORT || 5000
const userRouter = require('./Router/userRouter')
const messageRouter = require('./Router/MessageRouter')
const cors = require('cors')

app.use(cookieParser());  // Enable cookieParser to parse cookies from requests
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // Enable sending cookies over the secure connection
  methods: ['GET', 'POST', 'PUT', 'DELETE']  // Specify allowed HTTP methods for CORS
  
}));



app.use(express.urlencoded({ extended: true }))  // Enable bodyParser for handling form data

app.use(express.json())
app.use("/user", userRouter)
app.use("/salim",messageRouter )
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})