const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const cityInput = document.getElementById('city-input');
const weatherData = document.getElementById('weather-data');
const weatherImage = document.getElementById('weather-image');

searchBtn.addEventListener('click', async () => {
	const city = cityInput.value.trim();
	if (city) {
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=282564712dd984d03bb1d233a2428ce4&units=metric`);
			const data = await response.json();
			const temperature = data.main.temp;
			const weatherCondition = data.weather[0].main;
			const weatherDescription = data.weather[0].description;
			
			// Add weather condition-based images
			let weatherImg = '';
			switch (weatherCondition) {
				case 'Clear':
					weatherImg = 'sun.png';
					break;
				case 'Clouds':
					weatherImg = 'clouds.png';
					break;
				case 'Rain':
					weatherImg = 'rain.png';
					break;
				case 'Snow':
					weatherImg = 'snowflake.png';
					break;
				default:
					weatherImg = 'default.png';
			}
			
			weatherData.innerHTML = `
				<h2>${city}</h2>
				<p>Temperature: ${temperature}°C</p>
				<p>Weather: ${weatherCondition}</p>
				<p>Description: ${weatherDescription}</p>
			`;
			weatherImage.src = `images/${weatherImg}`;
		} catch (error) {
			console.error(error);
			weatherData.innerHTML = 'Error fetching data';
		}
	} else {
		weatherData.innerHTML = 'Please enter a city';
	}

    resetBtn.addEventListener('click', () => {
        cityInput.value = '';
        weatherData.innerHTML = '';
        weatherImage.src = 'images/weather-forecast.png';
    });

    
});

