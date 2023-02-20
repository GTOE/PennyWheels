const express = require("express");
const serverless = require("serverless-http");

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

const results = {
  distance: 3.271,
  time: 10,
};

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json(results);
});

// Use the router to handle requests to the `/.netlify/functions/route` path
app.use(`/.netlify/functions/route`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
