
const cities = ["Ogden", "Salt Lake City"];
const apiKey = "3dcc695989cf94c0cbe85564d7c0d206";
const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=" + apiKey;
const requestURL = `${queryURL}?key=${apiKey}`;

//Get the current weather using the API key.
function getWeather() {
  const apiKey = "3dcc695989cf94c0cbe85564d7c0d206";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }
  //Two separate API keys, one to get the weather, and one to get the forecast.
  const currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&appid=" + apiKey;
  const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&appid=" + apiKey;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching current weather data", error);
      alert("Error fetching current weather data.");

    });

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        displayForecast(data.list);
      })
      .catch(error => {
        console.error("Error fetching forecast data", error);
        alert("Error fetching forecast data.");
      });
}

//Display the data to the webpage.
function displayWeather(data) {
  //Use the IDs in the HTML to determine where to put the displayed data.
  const tempDivInfo = document.getElementById("temp");
  const weatherInfoDiv = document.getElementById("weather-info");
  const forecastDiv = document.getElementById("forecast");
  
  //Data fills in here
  weatherInfoDiv.innerHTML = "";
  forecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    // Gets the city, displays the temperature in Fahrenheit, and weather description.
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15) * 9/5 + 32;
    const description = data.weather[0].description;

    const temperatureHTML = `
      <p>${temperature}°F</p>
      `;
    const weatherHtml = `
      <p>${cityName}</p>
      <p>${description}</p>
      `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHtml = weatherHtml;
  }
}

// Gets the data for hourly forecast, still trying to figure out the 5-day forecast.
function displayForecast(hourlyData) {
  const forecastDiv = document.getElementById("forecast");
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15) * 9/5 + 32;
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
    <div class="hourly-item">
      <span>${hour}:00</span>
      <img src="${iconUrl}" alt="Hourly Weather Icon">
      <span>${temperature}°F</span>
    </div>
    `;
    forecastDiv.innerHTML += hourlyItemHtml;
  })
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = block;
}

