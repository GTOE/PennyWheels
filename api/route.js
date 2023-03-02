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

// const results = {
//   distance: 3.271,
//   time: 10
// }

const URL =
  'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=' +
  process.env.HERE_API_KEY

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get('/:start/:destination', (req, response) => {
  // geocode api
  // response from api is longitude + latitude
  // hand them into rout call

  // URL encode?
  const start = encodeURIComponent(req.params.start)
  const destination = encodeURIComponent(req.params.destination)

  //console.log(req.params, start, destination)

  const geoStartURL =
    'https://geocode.search.hereapi.com/v1/geocode?q=' +
    start +
    '&apiKey=' +
    process.env.HERE_API_KEY

  const geoDestinationURL =
    'https://geocode.search.hereapi.com/v1/geocode?q=' +
    destination +
    '&apiKey=' +
    process.env.HERE_API_KEY

  const longLatStart = getLongLat(geoStartURL)
  //console.log(longLatStart)

  longLatStart.then(function (coordinates) {
    console.log('coordinates', coordinates)
  })

  // https.get(geoStartURL, (res) => {
  //   let data = ''
  //   res.on('data', (chunk) => {
  //     data += chunk
  //   })
  //   res.on('end', () => {
  //     let start = data

  //     startLat = start.items[0].position.lat
  //     startLong = start.items[0].position.lng
  //   })
  // })

  // https.get(geoDestinationURL, (res) => {
  //   let data = ''
  //   res.on('data', (chunk) => {
  //     data += chunk
  //   })
  //   res.on('end', () => {
  //     let destination = data
  //     console.log('destination', destination.items[0].position.lat)
  //     desLat = destination.items[0].position.lat
  //     desLong = destination.items[0].position.lng
  //   })
  // })

  https.get(URL, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      let results = data
      //console.log(results)

      response.send(results)
    })
  })
})

function getLongLat(address) {
  console.log('getLongLat', address)
  const longLat = new Promise((resolve, reject) => {
    https.get(address, (res) => {
      console.log('res', res.statusCode, res)
      if (res.statusCode == '200') {
        let data = []
        res.on('data', (chunk) => {
          data.push(chunk)
          console.log('data + chunk types', typeof data, typeof chunk)
        })
        res.on('end', () => {
          let start = data

          console.log('start', start)

          const coordinates = {
            long: start.items[0].position.lng,
            lat: start.items[0].position.lat
          }

          resolve(coordinates)
        })
      }
      res.on('error', (error) => {
        console.log('err', error)
        reject(error)
      })
    })
  })
  return longLat
}
function getPromise(URL) {
  let promise = new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest()
    req.open('GET', URL)
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response)
      } else {
        reject('There is an Error!')
      }
    }
    req.send()
  })
  return promise
}
app.use(cors())

// Use the router to handle requests to the `/.netlify/functions/route` path
app.use(`/.netlify/functions/route`, router)

// Export the app and the serverless function
module.exports = app
module.exports.handler = serverless(app)
