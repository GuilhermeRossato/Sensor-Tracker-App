function elementNameToCamelCase(name) {
	return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}