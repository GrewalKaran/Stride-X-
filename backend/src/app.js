const express = require('express')
const cors = require('cors')
const {clerkMiddleware} = require('@clerk/express')
const syncRouter = require('./routes/user.route')
const raceRouter = require('./routes/race.route')


const app = express()
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/user',syncRouter)
app.use('/api',raceRouter)

module.exports = app

