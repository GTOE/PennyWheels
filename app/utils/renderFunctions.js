import { config } from "./config";

export function showTimeAndDistance(data) {
  console.log(data);
  const timeDistanceInfoEl = document.querySelector(
    config.element.TIME_DISTANCE_INFO
  );
  timeDistanceInfoEl.innerHTML = `<b>Geschätzte Zeit:</b> ${
    data.time
  } Minute(n) <b>Entfernung:</b> ${Math.round(data.distance * 100) / 100} km`;
}
