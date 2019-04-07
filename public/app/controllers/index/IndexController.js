angular.module('TemperatureWatcher')
.controller('IndexController', function IndexController($scope) {
	console.log("IndexController function executed");
	$scope.time = performance.now();
});
