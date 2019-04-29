const path = require("path");

function applyRoute(app) {
	app.get("/", function(req, res) {
		res.sendFile("index.html", { root: path.join(global.PROJECTDIR, "public") });
	});
}

module.exports = applyRoute;