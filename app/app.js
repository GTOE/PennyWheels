import './here-maps'

const config = {
  endpoint: {
    CARS_ENDPOINT: `/.netlify/functions/cars/`,
    ROUTE_ENDPOINT: `/.netlify/functions/route/`
  },
  element: {
    COUNT_BTN: `#count-btn`
  }
}

const trigger = document.querySelector(config.element.COUNT_BTN)

trigger.addEventListener('click', handleClick)
function handleClick(event) {
  event.preventDefault()

  const MOCK_VALUE = `10/22`

  fetch(config.endpoint.CARS_ENDPOINT + MOCK_VALUE)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
