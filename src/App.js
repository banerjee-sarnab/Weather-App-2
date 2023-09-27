import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherSearch from "./components/WeatherSearch";
import Forecast from "./components/Forecast"; // Import the Forecast component

const App = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [dailyForecast, setDailyForecast] = useState([]);

	useEffect(() => {
		// Initial default city for weather data (you can change this as needed)
		const defaultCity = "Kolkata";

		fetchWeatherData("90409ffa13314c260023bb438ad695a1", defaultCity);
	}, []);

	const fetchWeatherData = async (apiKey, city) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
			);

			if (!response.ok) {
				throw new Error("Weather data not found");
			}

			const data = await response.json();
			setWeatherData(data);

			// Fetch seven-day forecast data
			fetchSevenDayForecast(apiKey, data.coord.lat, data.coord.lon);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

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
		<div className="App">
			<Header />
			<div className="main-container">
				<div className="left-panel">
					{weatherData && <WeatherDisplay weatherData={weatherData} />}
					<Forecast dailyForecast={dailyForecast} />{" "}
					{/* Use the Forecast component */}
				</div>
				<div className="right-panel">
					<WeatherSearch
						onSearch={(query) =>
							fetchWeatherData("90409ffa13314c260023bb438ad695a1", query)
						}
					/>
				</div>
			</div>
			<footer>&copy; Sarnab Banerjee 2023</footer>
		</div>
	);
};

export default App;
