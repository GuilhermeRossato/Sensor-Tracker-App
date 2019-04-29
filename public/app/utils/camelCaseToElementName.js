/* eslint no-unused-vars: off */

/**
 * Converts a string in camelCase into HTML element name, which is divided by dashes (minus)
 *
 * @example camelCaseToElementName("helloWorld") === "hello-world"
 *
 * @param  {String} s The string in camelCase
 * @return {String}   The string separated by dashes (minus)
 */
function camelCaseToElementName(s) {
	return (s.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""));
}