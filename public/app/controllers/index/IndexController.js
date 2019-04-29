angular.module('TemperatureWatcher')
.controller('IndexController', function IndexController($scope, $interval) {

	let pullTimer;

	$scope.startTimer = function(interval = 5000) {
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

		const measurements = await requestApiResponse("/api/measurements");

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
