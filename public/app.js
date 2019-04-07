angular.module('TemperatureWatcher', ['ngRoute'])
.controller('IndexController', function($scope) {
	$scope.time = performance.now();
})
.controller('MainController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})
.config(function routeHandler($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('').html5Mode(true);
    $routeProvider.when("/", {
        controller: 'IndexController',
        templateUrl: "views/index.html"
    }).when("/test/", {
        controller: 'MainController',
        templateUrl: "views/second-page.html"
    });
});
