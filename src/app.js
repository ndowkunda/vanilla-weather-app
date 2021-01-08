function displayTemp(response) {
	let tempElement = document.querySelector("#current-temp");
	let cityElement = document.querySelector("#city-name");
	let descriptionElement = document.querySelector("#weather-description");
	let humidityElement = document.querySelector("#humidity-level");
	let windElement = document.querySelector("#wind-speed");
	tempElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML =
		"humidity: " + Math.round(response.data.main.humidity) + " %";
	windElement.innerHTML =
		"Wind " + Math.round(response.data.wind.speed) + " m/s";
	console.log(response);
}
let apiKey = "f6d0e3a57fd80dd4321d3619a54a57c4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
