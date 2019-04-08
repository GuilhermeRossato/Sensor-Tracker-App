const path = require("path");

function applyRoute(app) {
	// AngularJS redirect route
	app.get("/test/", function(req, res) {
	    res.sendFile("index.html", { root: path.join(global.PROJECTDIR, "public") });
	});
}

module.exports = applyRoute;