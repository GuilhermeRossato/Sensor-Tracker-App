angular.module("TemperatureWatcher")
	.component(elementNameToCamelCase("measurement-list"), {
		templateUrl: "app/components/measurement-list/template.html",
		controller: function($scope) {
			$scope.measurements = [];

			$scope.$watch("$ctrl.measurements", function(newVal) {
				if (newVal !== undefined) {
					$scope.measurements = newVal;
				}
			});
		},
		bindings: {
			measurements: "<"
		}
	});