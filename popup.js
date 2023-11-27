// popup.js
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getWeatherButton")
    .addEventListener("click", getLocation);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiKey = "5c0c6e8a97b4a98754e1d3a0180b79a7";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weather-info");
      const weatherIcon = data.weather[0].icon; // Weather icon code

      weatherInfo.innerHTML = `
        <p>Location: ${data.name}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
