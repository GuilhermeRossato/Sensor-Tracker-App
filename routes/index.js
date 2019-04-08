var fs = require('fs');

/**
 * Applies every routing in the routes folder
 * @param  {express.Server} app  The express server to apply the routes
 * @return {Number}              The number of route rules applied
 */
function applyEveryRoute(app) {
	let name, func, count = 0;
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;
        name = file.substr(0, file.indexOf('.'));
        func = require('./' + name);
        if (func instanceof Function) {
        	count++;
        	func(app);
        } else {
        	console.warn("Unable to apply routes from \"%s\"", name);
        }
    });
    return count;
}

module.exports = applyEveryRoute;