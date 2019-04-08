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

// Listen for requests
app.listen(port, function() {
    console.log("Server listening in \"%s\" mode", app.settings.env);
});
