angular.module("TemperatureWatcher")
	.component(elementNameToCamelCase("no-measurement"), {
		templateUrl: "app/components/no-measurement/template.html",
		controller: function($scope) {
			$scope.actionUrl = "/api/dummy/";
		}
	});