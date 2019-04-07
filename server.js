const express = require("express");
const morgan = require("morgan");

const app = module.exports = express();

// General Server Configuration
app.configure(function() {
	// Serve Public Assets
	app.use(express.static(__dirname + '/public'));
});

// Development-specific Server Configuration
app.configure("development", function() {
	// Log requests
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
});

// Basic Route

app.get("/", function(req, res){
	res.render('index.html');
});

// Listen for requests
app.listen(8080, function() {
	console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);
});
