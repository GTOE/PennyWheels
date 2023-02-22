const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')

// Create an instance of the Express app
const app = express()

// Create a router to handle routes
const router = express.Router()

const results = [
  {
    firm: 'Sharenow',
    type: 'S',
    car: 'Citroën C3',
    unlock: 0.0,
    km: 0.0,
    min: 0.28
  },
  {
    firm: 'Miles',
    type: 'S',
    car: 'Minicooper',
    unlock: 1.0,
    km: 0.98,
    min: 0.0
  }
]

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get('/:km/:min', (req, res) => {
  const km = req.params.km
  const min = req.params.min

  const cheapestCars = getCheapestCar(km, min)

  res.json(cheapestCars)
})

function getCheapestCar(km, min) {
  var cars = results.map(function totalCosts(car) {
    return {
      ...car,
      total: car.unlock + km * car.km + min * car.min
    }
  })

  cars.sort(function (a, b) {
    return a.total - b.total
  })

  return cars
}

app.use(cors())

// Use the router to handle requests to the `/.netlify/functions/cars` path
app.use(`/.netlify/functions/cars`, router)

// Export the app and the serverless function
module.exports = app
module.exports.handler = serverless(app)
