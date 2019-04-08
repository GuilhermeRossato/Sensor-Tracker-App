angular.module('TemperatureWatcher')
.controller('IndexController', function IndexController($scope, $interval) {

	let pullTimer;
	// Handle automatic updates
	$scope.loadMeasurements = async function loadMeasurements(isFirst = false) {
		if ($scope.error) {
			return $interval.cancel(pullTimer);
		}
		var response = await fetch("/api/measurements");

		if (!response) {
			$scope.loadingObject.loading = true;
			$scope.error = "No response";
			return false;
		}

		if (!response.ok) {
			$scope.loadingObject.loading = true;
			$scope.error = "Error HTTP Status: "+response.status.toString();
			return false;
		}

		try {
			json = await response.json();
		} catch (err) {
			console.error(err);
			$scope.loadingObject.loading = true;
			$scope.error = "JSON conversion failed: "+err.stack.toString();
			return false;
		}

		if (!json) {
			return $interval.cancel(pullTimer);
		}
		if (!json.error) {
			$scope.measurementsObject.measurements = json;
		} else {
			$scope.loadingObject.loading = true;
			$scope.error = "Something went wrong";
		}
		$scope.loadingObject.loading = false;
		$scope.timeObject.time = formatDateString(new Date());
		$scope.$apply();
	};

	$scope.loadingObject = {
		loading: true,
	}
	$scope.timeObject = {
		time: 0
	}

	pullTimer = $interval($scope.loadMeasurements, 5000);

	$scope.$on('$destroy', function(){
		if (pullTimer) {
			$interval.cancel(pullTimer);
		}
	});

	$scope.loadMeasurements(true);

	$scope.measurementsObject = {
		measurements: []
	};
});
