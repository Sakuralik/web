const apiKey = 'dc93b45a70842475ab19b35c2ba1a4fc';

function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weather-info");

    if (cityInput === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;    

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const cityName = data.name;

            const weatherMessage = `Current weather in ${cityName}: ${temperature}°C, ${description}.`;
            weatherInfo.textContent = weatherMessage;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.textContent = "Error fetching weather data. Please try again later.";
        });
}
