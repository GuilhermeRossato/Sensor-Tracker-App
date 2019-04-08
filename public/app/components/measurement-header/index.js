angular.module('TemperatureWatcher')
.component(elementNameToCamelCase('measurement-header'), {
    templateUrl: 'app/components/measurement-header/template.html',
    controller: function($scope) {
        $scope.name = "";
        $scope.lastUpdate = "Never";

        $scope.$watch('$ctrl.values', (values) => {
            if (!values || !values.length) {
                $scope.lastUpdate = "Never";
            } else {
                var last = values[values.length-1];
                $scope.lastUpdate = formatDateString(new Date(last.date));
            }
        });

        $scope.$watch('$ctrl.name', (newVal) => newVal ? ($scope.name = newVal) : false);
    },
    bindings: {
        name: '<',
        values: '<'
    }
});