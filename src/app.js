function formatDate(timestamp) {
	let date = new Date(timestamp);

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return ` Updated: ${day} , ${formatHours(timestamp)}`;
}
function formatHours(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${hours}:${minutes}`;
}

function displayTemp(response) {
	let tempElement = document.querySelector("#current-temp");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#weather-description");
	let humidityElement = document.querySelector("#humidity-level");
	let windElement = document.querySelector("#wind-speed");
	let dateElement = document.querySelector("#current-datetime");
	let iconElement = document.querySelector("#weather-icon");
	celsiusTemp = response.data.main.temp;
	tempElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML =
		"humidity: " + Math.round(response.data.main.humidity) + " %";
	windElement.innerHTML =
		"Wind " + Math.round(response.data.wind.speed) + " m/s";
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function displayForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = null;
	let forecast = null;
	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastElement.innerHTML += `<div class="col-sm-2 ">
			<h3>${formatHours(forecast.dt * 1000)}</h3>
			<ul>
				<li class="forecast-icon">
					<img
						src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
						alt="sunshine-icon"
					/>
				</li>
				<li class="max-temp">${Math.round(forecast.main.temp_max)}°</li>
				<li class="min-temp">${Math.round(forecast.main.temp_min)}°</li>
			</ul>
		</div>
		`;
	}
}

function search(city) {
	let apiKey = "f6d0e3a57fd80dd4321d3619a54a57c4";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemp);

	apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayFahrenheitTemp(event) {
	event.preventDefault();
	let tempElement = document.querySelector("#current-temp");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemp = celsiusTemp * 1.8 + 32.0;
	tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function displaycelsiusTemp(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let tempElement = document.querySelector("#current-temp");
	tempElement.innerHTML = Math.round(celsiusTemp);
}

function getPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "f6d0e3a57fd80dd4321d3619a54a57c4";

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemp);

	apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}
function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(getPosition);
}

let celsiusTemp = null;

let locationButton = document.querySelector("#geolocation");
locationButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemp);
