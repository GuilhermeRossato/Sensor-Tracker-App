const express = require("express");
const morgan = require("morgan");
const path = require("path");

const PROJECTDIR = __dirname;
const port = process.env.PORT || 8080;
const app = module.exports = express();

// Serve Public Assets
app.use(express.static(__dirname + '/public'));


// Development-specific Server Configuration
if (app.settings.env !== "production") {
    // Log requests
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

// Basic Route Test
app.get("/", function(req, res) {
    res.sendfile("index.html", { root: path.join(PROJECTDIR, "public") });
});

// Listen for requests
app.listen(port, function() {
    console.log("Server listening in \"%s\" mode", app.settings.env);
});
