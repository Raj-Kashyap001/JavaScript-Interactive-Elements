const inputEl = document.querySelector("#city-input");
(getBtn = document.querySelector("#get-btn")),
  (cityNameEl = document.querySelector(".city-name")),
  (temperatureEl = document.querySelector(".temperature")),
  (skyEl = document.querySelector(".sky")),
  (windSpeedEl = document.querySelector(".wind-speed")),
  (humidityEl = document.querySelector(".humidity")),
  (currentDateEl = document.querySelector(".current-date")),
  (weatherImageEl = document.querySelector(".weather-img")),
  (locationCardEl = document.querySelector(".location-card")),
  (loader = document.querySelector(".load"));

const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

getBtn.onclick = function () {
  let cityName = inputEl.value;
  generateWeatherData(cityName);
};

async function generateWeatherData(cityName) {
  try {
    loader.classList.add("active");

    const API_KEY = "5fc08b4ab331b11ded4624e893ff76e4";
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cityName}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.success === false) {
      throw new Error("City not found");
    }

    loader.classList.remove("active");
    locationCardEl.classList.add("active");

    renderWeatherData(cityName, data);
  } catch (error) {
    alert("Something went wrong! check the name and try again.");
    loader.classList.remove("active");
    locationCardEl.classList.remove("active");
    currentDateEl.innerText = "";
    cityNameEl.innerText = "";
    weatherImageEl.src = "";
    skyEl.innerText = "";
    temperatureEl.innerText = "";
    humidityEl.innerText = "";
    windSpeedEl.innerText = "";
  }
}

function renderWeatherData(cityName, data) {
  currentDateEl.innerText = `Today, ${
    months[date.getMonth()]
  } ${date.getDate()}`;
  cityNameEl.innerText = cityName;
  weatherImageEl.src = data.current.weather_icons[0];
  skyEl.innerText = data.current.weather_descriptions[0];
  temperatureEl.innerText = data.current.temperature + "°";
  humidityEl.innerText = data.current.humidity + "%";
  windSpeedEl.innerText = data.current.wind_speed + " km/h";
}
