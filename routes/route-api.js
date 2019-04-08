const path = require("path");
const ApiController = require("../controllers/ApiController.js");

function applyRoute(app) {
	// Add another beer name
	app.get("/api/dummy", ApiController.insertDummyGroup);
	app.get("/api/measurements", ApiController.listMeasurements);
}

module.exports = applyRoute;