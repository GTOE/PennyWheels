// import './here-maps'

const config = {
  endpoint: {
    CARS_ENDPOINT: `http://localhost:9000/.netlify/functions/cars/`,
    ROUTE_ENDPOINT: `http://localhost:9000/.netlify/functions/route/`
  },
  element: {
    CALCULATE_BTN: `#calculate-btn`,
    RESULT_LIST: `#result-list`,
    TIME_DISTANCE_INFO: `#time-distance-info`
  }
}

const trigger = document.querySelector(config.element.CALCULATE_BTN)

trigger.addEventListener('click', handleClick)

async function handleClick(event) {
  event.preventDefault()

  fetch(config.endpoint.ROUTE_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data)

      const route = data.routes[0]

      console.log('route', route)

      const tripSummary = route.sections[0].summary

      showTimeAndDistance(tripSummary)
      fetch(
        config.endpoint.CARS_ENDPOINT +
          `${Math.round(tripSummary.length / 1000)}/${Math.round(
            tripSummary.duration / 60
          )}`
      )
        .then((response) => response.json())
        .then(showResults)
    })
}

function showResults(data) {
  const resultListEl = document.querySelector(config.element.RESULT_LIST)
  document.querySelectorAll('.results').forEach((el) => el.remove())

  data.forEach((element) => {
    const listEl = document.createElement('li')
    listEl.setAttribute('class', 'results')
    listEl.innerHTML = `<b>Anbieter:</b> ${element.firm} <br> <b>Modell:</b> ${
      element.car
    } <br> <b>Gesamtkosten: ${Math.round(element.total * 100) / 100} €</b>`

    resultListEl.append(listEl)
  })
}

function showTimeAndDistance(data) {
  const timeDistanceInfoEl = document.querySelector(
    config.element.TIME_DISTANCE_INFO
  )
  timeDistanceInfoEl.innerHTML = `<b>Geschätzte Zeit:</b> ${Math.round(
    data.duration / 60
  )} Minute(n) ${
    data.duration % 60
  } Sekunde(n) im aktuellen Verkehr <b>Entfernung:</b> ${data.length / 1000} km`
}
