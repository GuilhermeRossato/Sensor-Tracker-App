/* eslint no-unused-vars: off */

/**
 * Converts a string in HTML element name to camelCase into which has no divisions and is separated by uppercase characters
 *
 * @example elementNameToCamelCase("hello-world") === "helloWorld"
 *
 * @param  {String} s The string separated by dashes (minus)
 * @return {String}   The string in camelCase
 */
function elementNameToCamelCase(s) {
	return s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}