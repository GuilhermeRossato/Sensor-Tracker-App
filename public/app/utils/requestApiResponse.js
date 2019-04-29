/* eslint no-unused-vars: off */

async function requestApiResponse(url = "/api/") {
	let response, json;
	try {
		response = await fetch(url);
	} catch (err) {
		console.warn(err);
		return {
			"error": true,
			"message": err.stack
		};
	}
	if (!response || !response.ok) {
		const errorCode = ((response && response.status) ? response.status : 0);
		console.warn("Request to "+url+" returned error code "+errorCode);
		return {
			"error": true,
			"message": "HTTP Error Status "+errorCode
		};
	}
	try {
		json = await response.json();
	} catch (err) {
		console.warn(err);
		return {
			"error": true,
			"message": err.stack
		};
	}
	return json;
}