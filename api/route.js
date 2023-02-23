const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const https = require('https')

const dotenv = require('dotenv')
dotenv.config()

// Create an instance of the Express app
const app = express()

// Create a router to handle routes
const router = express.Router()

const results = {
  distance: 3.271,
  time: 10
}

const URL =
  'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=' +
  process.env.HERE_API_KEY
console.log('URL', URL)

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get('/', (req, res) => {
  // TODO: fix this!!!!
  https.get(URL, (res) => {
    res.on('data', (d) => {
      console.log(d)
    })
  })

  res.json(results)
})

app.use(cors())

// Use the router to handle requests to the `/.netlify/functions/route` path
app.use(`/.netlify/functions/route`, router)

// Export the app and the serverless function
module.exports = app
module.exports.handler = serverless(app)
