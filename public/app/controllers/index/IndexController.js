async function loadMeasurements() {
	let response, json;
	try {
		response = await fetch("/api/measurements");
	} catch (err) {
		console.warn(err);
		return {
			"error": true,
			"message": err.stack
		};
	}
	if (!response || !response.ok) {
		return {
			"error": true,
			"message": "HTTP Error Status "+response.status
		};
	}
	try {
		json = await response.json();
	} catch (err) {
		console.warn(err);
		return {
			"error": true,
			"message": err.stack
		};
	}
	return json;
}

angular.module('TemperatureWatcher')
.controller('IndexController', function IndexController($scope, $interval) {

	let pullTimer;

	$scope.startTimer = function(interval = 2000) {
		if (pullTimer) {
			$scope.stopTimer();
		}
		pullTimer = $interval($scope.refreshData, interval);
	}

	$scope.stopTimer = function() {
		$interval.cancel(pullTimer);
		pullTimer = undefined;
	}
	// Handle automatic updates
	$scope.refreshData = async function refreshData(isFirst = false) {
		if ($scope.error) {
			return $scope.stopTimer();
		}

		const measurements = await loadMeasurements();

		if (!measurements || measurements.error) {
			$scope.error = measurements.message;
			$scope.$apply();
			return $scope.stopTimer();
		}

		$scope.measurements = measurements;

		$scope.loading = false;
		$scope.lastUpdate = formatDateString(new Date());
		$scope.$apply();
	};

	$scope.loading = true;
	$scope.lastUpdate = "";
	$scope.measurements = [];

	$scope.$on('$destroy', function(){
		if (pullTimer) {
			$interval.cancel(pullTimer);
		}
	});

	$scope.refreshData(true);
	$scope.startTimer();
});
