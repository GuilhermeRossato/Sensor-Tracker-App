const ApiController = require("../controllers/ApiController.js");

function applyRoute(app) {
	// Add another beer name
	app.post("/api/dummy", ApiController.insertDummyGroup);
	app.get("/api/measurements", ApiController.listMeasurements);
}

module.exports = applyRoute;