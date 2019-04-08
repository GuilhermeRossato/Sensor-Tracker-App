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