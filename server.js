const express = require("express");
const morgan = require("morgan");
const path = require("path");

const PROJECTDIR = __dirname;
const port = process.env.PORT || 8080;
const app = module.exports = express();

// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// Serve angular from node_modules
app.use("/node_modules", express.static(__dirname + '/node_modules'));

// Development-specific Server Configuration
if (app.settings.env !== "production") {
    // Log requests
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

// Basic Route Test
app.get("/", function(req, res) {
    res.sendFile("index.html", { root: path.join(PROJECTDIR, "public") });
});
app.get("/test/", function(req, res) {
    res.sendFile("index.html", { root: path.join(PROJECTDIR, "public") });
});

// Listen for requests
app.listen(port, function() {
    console.log("Server listening in \"%s\" mode", app.settings.env);
});
