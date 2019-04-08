angular.module('TemperatureWatcher').config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('').html5Mode(true);

    $routeProvider.when("/", {
        controller: 'IndexController',
        templateUrl: "app/controllers/index/IndexTemplate.html"
    });

    $routeProvider.when("/test/", {
        controller: 'IndexController',
        templateUrl: "app/controllers/index/IndexTemplate.html"
    });
});
