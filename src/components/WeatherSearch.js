import React, { useState } from "react";

const WeatherSearch = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(query);
		setQuery("");
	};

	return (
		<div className="weather-search">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter location"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default WeatherSearch;
