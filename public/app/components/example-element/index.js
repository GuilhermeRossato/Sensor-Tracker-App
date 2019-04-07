angular.module('TemperatureWatcher')
.component('exampleElement', {
    templateUrl: 'app/components/example-element/template.html',
    controller: function($scope) {
        console.log("component started");
        $scope.time = performance.now();
    }
});