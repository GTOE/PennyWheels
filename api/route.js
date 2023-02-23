// const hereApi = require("@here/maps-api-for-javascript");
// const hereApi = require("./here-api");

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

// const res = await fetch(
//   "https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=" +
//     process.env.HERE_API_KEY +
//     ""
// );
// const json = await res.json();
// console.log(json);

const https = require("https");

https.get(
  'https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey="+process.env.HERE_API_KEY+"',
  (res) => {
    let data = [];
    const headerDate =
      res.headers && res.headers.date ? res.headers.date : "no response date";
    console.log("Status Code:", res.statusCode);
    console.log("Date in Response header:", headerDate);

    res.on("data", (chunk) => {
      data.push(chunk);
    });
  }
);

const corsOptions = {
  origin: "http://localhost:1234",
  optionsSuccessStatus: 200,
};

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

const results = {
  distance: 3.271,
  time: 10,
};

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", cors(corsOptions), (req, res) => {
  res.json(results);
});

// app.use(cors(corsOptions));

// Use the router to handle requests to the `/.netlify/functions/route` path
app.use(`/.netlify/functions/route`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
