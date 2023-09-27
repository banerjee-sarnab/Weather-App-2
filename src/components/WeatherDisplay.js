import React from "react";

const WeatherDisplay = ({ weatherData }) => {
	if (!weatherData) {
		return <div>Loading...</div>;
	}

	const { name } = weatherData;
	const { main, description, icon } = weatherData.weather[0];
	const { temp, humidity } = weatherData.main;

	return (
		<div className="weather-display">
			<h2>{name}</h2>
			<div className="weather-icon">
				<img
					src={`http://openweathermap.org/img/w/${icon}.png`}
					alt="Weather Icon"
				/>
			</div>
			<div className="weather-info">
				<h3>{main}</h3>
				{/* <p>{description}</p> */}
				<p>Temperature: {temp}°C</p>
				<p>Humidity: {humidity}%</p>
			</div>
		</div>
	);
};

export default WeatherDisplay;
