import React, { useState, useEffect } from "react";

const Forecast = ({ apiKey, latitude, longitude }) => {
	const [dailyForecast, setDailyForecast] = useState([]);

	useEffect(() => {
		fetchSevenDayForecast(apiKey, latitude, longitude);
	}, [apiKey, latitude, longitude]);

	const fetchSevenDayForecast = async (apiKey, latitude, longitude) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`
			);

			if (!response.ok) {
				throw new Error("Forecast data not found");
			}

			const data = await response.json();
			const dailyData = data.daily.slice(1, 8); // Get the next seven days

			setDailyForecast(dailyData);
		} catch (error) {
			console.error("Error fetching seven-day forecast data:", error);
		}
	};

	return (
		<div className="forecast">
			{/* <h2>7-Day Forecast</h2> */}
			<ul>
				{dailyForecast.map((day, index) => (
					<li key={index}>
						<strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>:{" "}
						{day.weather[0].description}, High: {day.temp.max}°C, Low:{" "}
						{day.temp.min}°C
					</li>
				))}
			</ul>
		</div>
	);
};

export default Forecast;
