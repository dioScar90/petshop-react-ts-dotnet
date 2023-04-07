import { useState, useEffect } from 'react';

export function TimeNow(): JSX.Element {

	const [timeNow, setTimeNow] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		setInterval(() => {
			const timeNow = new Date().toLocaleTimeString();
			setTimeNow(timeNow);
		}, 1000);
	});

	return (
		<p>Now it's: <strong>{timeNow}</strong>.</p>
	)
}