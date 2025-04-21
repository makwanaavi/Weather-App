const WEATHER_API_KEY = "31a64aa1ae086a8cd4a993c8f160d77b"; // Your OpenWeatherMap API Key

function fetchWeatherDetails() {
  const cityInput = document.getElementById("cityInput").value.trim(); 

  if (!cityInput) {
    alert("Please enter a city name to get the weather info.");
    return;
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${WEATHER_API_KEY}&units=metric`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((weather) => {
      if (weather.cod === "404") {
        document.getElementById("weatherResult").innerHTML =
          "<p>City not found! Try again.</p>";
        return; 
      }

      const {
        name,
        main: { temp },
        weather: [{ description, icon }],
        wind: { speed },
        coord: { lat, lon },
      } = weather;


      const resultHTML = `
        <div class="weather-card">
          <h2>${name}</h2>
          <p>Temperature:${temp}°C</p>
          <p>Condition:${description}</p>
          <p>Wind Speed:${speed} m/s</p>
          <p>Coordinates:Latitude ${lat}, Longitude ${lon}</p>
        </div>
      `;

      document.getElementById("weatherResult").innerHTML = resultHTML;

      console.log(`✔ Weather fetched for ${name}: ${temp}°C, ${description}`);
    })
    .catch((err) => {
      console.error(" Error fetching weather:", err);
      document.getElementById("weatherResult").innerHTML =
        "<p>⚠️ Something went wrong. Please try again later.</p>";
    });
}
