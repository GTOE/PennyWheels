import "./here-maps";
import { showTimeAndDistance } from "./utils/renderFunctions";
import { config } from "./utils/config";

const trigger = document.querySelector(config.element.CALCULATE_BTN);

trigger.addEventListener("click", handleClick);

async function handleClick(event) {
  event.preventDefault();

  var data = JSON.parse(localStorage.getItem("data"));

  if (!data) {
    return;
  }

  // fetch(config.endpoint.ROUTE_ENDPOINT)
  // .then((response) => response.json())
  // .then((data) => {
  showTimeAndDistance(data);

  fetch(config.endpoint.CARS_ENDPOINT + `${data.distance}/${data.time}`)
    .then((response) => response.json())
    .then(showResults);
  // });
}

function showResults(data) {
  const resultListEl = document.querySelector(config.element.RESULT_LIST);
  document.querySelectorAll("li").forEach((el) => el.remove());

  data.forEach((element) => {
    const listEl = document.createElement("li");
    listEl.innerHTML = `<b>Anbieter:</b> ${element.firm} <br> <b>Modell:</b> ${
      element.car
    } <br> <b>Gesamtkosten: ${Math.round(element.total * 100) / 100} €</b>`;

    resultListEl.append(listEl);
  });
}
