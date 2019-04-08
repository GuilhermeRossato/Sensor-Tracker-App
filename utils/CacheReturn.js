/**
 * Lazily create a object and ensure it is created only once through a creation function passed as parameter
 *
 * @param {[type]} creationFunction The function to be executed once to create the value
 * @return {mixed}                  The value returned by creationFunction
 */
const CacheReturn = function(creationFunction) {
	var cache = undefined;
	return function(...args) {
		if (cache === undefined) {
			cache = creationFunction(...args);
		}
		return cache;
	}
}

module.exports = CacheReturn;