const ApiController = require("../controllers/ApiController.js");

function applyRoute(app) {
	app.post("/api/dummy", ApiController.insertDummyGroup);
	app.get("/api/measurements", ApiController.listMeasurements);
}

module.exports = applyRoute;