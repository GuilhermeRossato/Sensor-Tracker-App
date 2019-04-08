const path = require("path");
const express = require("express");

function applyRoute(app) {
	// Serve Public Assets
	const publicDir = path.join(global.PROJECTDIR, "public");
	app.use(express.static(publicDir));

	// Serve angular from node_modules
	const nodeModulesDir = path.join(global.PROJECTDIR, "node_modules");
	app.use("/node_modules", express.static(nodeModulesDir));
}

module.exports = applyRoute;