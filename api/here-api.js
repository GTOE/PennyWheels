import H from "@here/maps-api-for-javascript";

var platform = new H.service.Platform({
  apikey: process.env.HERE_API_KEY,
});

function calculateRouteFromAtoB(platform) {
  var router = platform.getRoutingService(null, 8),
    routeRequestParams = {
      routingMode: "fast",
      transportMode: "car",
      origin: "52.5160,13.3779", // Brandenburg Gate
      destination: "52.5206,13.3862", // Friedrichstraße Railway Station
      return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
    };
  console.log(router);
}

// const hereApi = {};
module.exports = { calculateRouteFromAtoB };

// console.log("test");
// calculateRouteFromAtoB(platform);
