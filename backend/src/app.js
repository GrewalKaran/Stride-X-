const express = require('express')
const cors = require('cors')
const {clerkMiddleware} = require('@clerk/express')
const syncRouter = require('./routes/user.route')
const raceRouter = require('./routes/race.route')
const multiplayerRouter = require('./routes/multiplayer.race.route')


const app = express()
app.use(
  cors({
    origin: [
      "https://stride-x-m73w.vercel.app",
      "https://stride-x-m73w-iyj6pzd6v-grewalkarans-projects.vercel.app",
      "https://stride-x-m73w.vercel.app/?_vercel_share=zKzErsHc7jtIkbtFulKnj5zdwpKnLbyZhttps://stride-x-m73w.vercel.app/?_vercel_share=zKzErsHc7jtIkbtFulKnj5zdwpKnLbyZ",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/user',syncRouter)
app.use('/api',raceRouter)
app.use('/api/multiplayer',multiplayerRouter)

module.exports = app

