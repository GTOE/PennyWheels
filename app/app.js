//import './here-maps'

const config = {
  endpoint: {
    CARS_ENDPOINT: `http://localhost:9000/.netlify/functions/cars/`,
    ROUTE_ENDPOINT: `http://localhost:9000/.netlify/functions/route/`
  },
  element: {
    CALCULATE_BTN: `#calculate-btn`
  }
}

const trigger = document.querySelector(config.element.CALCULATE_BTN)

trigger.addEventListener('click', handleClick)

async function handleClick(event) {
  event.preventDefault()

  fetch(config.endpoint.ROUTE_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      fetch(config.endpoint.CARS_ENDPOINT + `${data.distance}/${data.time}`)
    })
}
