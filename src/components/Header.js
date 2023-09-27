import React, { useState, useEffect } from "react";

const Header = () => {
	const [currentDateTime, setCurrentDateTime] = useState("");

	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date();
			const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
				2,
				"0"
			)}-${String(now.getDate()).padStart(2, "0")}`;
			const time = `${String(now.getHours()).padStart(2, "0")}:${String(
				now.getMinutes()
			).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
			setCurrentDateTime(`Date: ${date} <br /> Time: ${time}`);
		};

		const interval = setInterval(updateDateTime, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<header>
			<h1>Any Weather App</h1>
			<p dangerouslySetInnerHTML={{ __html: currentDateTime }} />
		</header>
	);
};

export default Header;
