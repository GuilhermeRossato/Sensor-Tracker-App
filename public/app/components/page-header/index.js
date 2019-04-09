angular.module('TemperatureWatcher')
.component(elementNameToCamelCase('page-header'), {
    templateUrl: 'app/components/page-header/template.html',
    controller: function($scope) {
        $scope.title = "random Title";
        $scope.link = "/api//";
        $scope.linkLabel = "New Measurement";

        $scope.$watch('$ctrl.title', function(newVal, new2) {
            if (newVal) {
                $scope.title = newVal;
            }
        });

        $scope.$watch('$ctrl.linkLabel', function(newVal, new2) {
            $scope.linkLabel = newVal;
        });

        $scope.$watch('$ctrl.link', function(newVal, new2) {
            if (typeof newVal === "string") {
                $scope.link = newVal;
            }
        });
    },
    bindings: {
        title: '@',
        link: '@',
        linkLabel: '@'
    }
});