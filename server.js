const express = require("express");
const morgan = require("morgan");
const applyRoute = require("./routes/index.js");

const path = require("path");
global.PROJECTDIR = path.resolve(__dirname);

const port = process.env.PORT || 8080;
const app = module.exports = express();

// Development-specific Server Configuration
if (app.settings.env !== "production") {
    // Log requests
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
}

applyRoute(app);

if (app.settings.env === "development") {
	// Listen for DB requests
	const startLocalServer = require("./utils/localServerHandler.js");
	startLocalServer().then(function(connection) {
		global.CONN_STRING = connection;
		console.log("Started local mongoDB server at %s", connection);
	});
	const startReadingMocker = require("./utils/cronMeasureMocker.js");
	startReadingMocker();

} else if (process.env.CONNECTION_STRING) {
	global.CONN_STRING = process.env.CONNECTION_STRING;
} else {
	throw new Error("No database configured for environment \""+app.settings.env+"\"");
}

const startNotifier = require("./utils/watchNotifier.js");
startNotifier();

// Listen for web requests
app.listen(port, function() {
    console.log("Server listening in \"%s\" mode", app.settings.env);
});
