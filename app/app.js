//import './here-maps'

const config = {
  endpoint: {
    CARS_ENDPOINT: `http://localhost:9000/.netlify/functions/cars/`,
    ROUTE_ENDPOINT: `http://localhost:9000/.netlify/functions/route/`
  },
  element: {
    COUNT_BTN: `#count-btn`
  }
}

const trigger = document.querySelector(config.element.COUNT_BTN)

trigger.addEventListener('click', handleClick)
async function handleClick(event) {
  event.preventDefault()

  const MOCK_VALUE = `10/22`

  const response = await getRoute(MOCK_VALUE)
  console.log('response: ' + response)
}

function getRoute(value) {
  try {
    fetch(config.endpoint.CARS_ENDPOINT + value)
  } catch (err) {
    console.log('NOK - ' + err)
  }
}
