//import './here-maps'

const config = {
  endpoint: {
    CARS_ENDPOINT: `http://localhost:9000/.netlify/functions/cars/`,
    ROUTE_ENDPOINT: `http://localhost:9000/.netlify/functions/route/`
  },
  element: {
    CALCULATE_BTN: `#calculate-btn`,
    RESULT_LIST: `#result-list`
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
        .then((response) => response.json())
        .then(showResults)
    })
}

function showResults(data) {
  const resultListEl = document.querySelector(config.element.RESULT_LIST)
  document.querySelectorAll('li').forEach((el) => el.remove())

  data.forEach((element) => {
    console.log(element)
    const listEl = document.createElement('li')
    listEl.innerHTML = `<b>Anbieter:</b> ${element.firm} <br> <b>Modell:</b> ${
      element.car
    } <br> <b>Gesamtkosten: ${Math.round(element.total * 100) / 100} €</b>`

    resultListEl.append(listEl)
  })
}
