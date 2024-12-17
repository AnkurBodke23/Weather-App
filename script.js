const API_KEY = 'd1c7119fcca9495d52967b81aeb31bee'; // Replace with your API key from a weather service

function changeBackgroundColor(condition) {
    const weatherBox = document.getElementById('weather-box');
    if (condition.includes('clear')) {
        weatherBox.style.backgroundColor = '#FFD700'; // sunny
    } else if (condition.includes('cloud')) {
        weatherBox.style.backgroundColor = '#D3D3D3'; // cloudy
    } else if (condition.includes('rain')) {
        weatherBox.style.backgroundColor = '#87CEFA'; // rainy
    } else if (condition.includes('snow')) {
        weatherBox.style.backgroundColor = '#F0FFFF'; // snowy
    } else {
        weatherBox.style.backgroundColor = '#FFF'; // default
    }
}

function fetchWeather() {
    const location = document.getElementById('location-input').value;
    const weatherContainer = document.getElementById('weather-container');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            weatherContainer.style.display = 'block';
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            const weatherCondition = data.weather[0].description;
            condition.textContent = `Condition: ${weatherCondition}`;
            changeBackgroundColor(weatherCondition);
        })
        .catch(error => {
            alert(error.message);
            weatherContainer.style.display = 'none';
        });
}
