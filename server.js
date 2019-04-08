const path = require("path");
const express = require("express");
const morgan = require("morgan");
const applyRoutes = require("./routes/index.js");

global.PROJECTDIR = path.resolve(__dirname);

const port = process.env.PORT || 8080;
const app = express();

// Development-specific Server Configuration
if (app.settings.env !== "production") {
    // Log requests
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
}

applyRoutes(app);

// Handle Services
let ExpressServer = app;
let LocalDatabaseService = undefined;
let WatchNotifierHandler = undefined;
let CronMockerHandler = undefined;

if (app.settings.env === "development") {

    // Local MongoDB Server
    LocalDatabaseService = require("./services/LocalDatabaseService.js");
    LocalDatabaseService.start().then(function(connectionString) {
        global.CONN_STRING = connectionString;
        console.log("MongoDB Server listening at %s", connectionString);
    });

    // Local Cron Mocker Handler
    CronMockerHandler = require("./services/CronMeasureMockerService.js");
    CronMockerHandler.start();
} else if (process.env.CONNECTION_STRING) {
    global.CONN_STRING = process.env.CONNECTION_STRING;
} else {
    throw new Error("No database configured for environment \""+app.settings.env+"\"");
}

WatchNotifierHandler = require("./services/WatchNotifierService.js");
WatchNotifierHandler.start();

// Listen for web requests
app.listen(port, function() {
    console.log("Web Server listening at port %d in \"%s\" mode", port, app.settings.env);
});

module.exports = {ExpressServer, LocalDatabaseService, WatchNotifierHandler, CronMockerHandler};