// public/js/appRoutes.js
    angular.module('plataformaApp-routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })

        .when('/iot', {
            templateUrl: 'views/iot.html',
            controller: 'iotCtrl'
        })

        .when('/hackathon', {
            templateUrl: 'views/hackathon.html',
            controller: 'hackathonCtrl'
        })

        .when('/desafio', {
            templateUrl: 'views/desafio.html',
            controller: 'desafioCtrl'
        })

        .when('/participe', {
            templateUrl: 'views/participe.html',
            controller: 'participeCtrl'
        })

        .when('/feed', {
            templateUrl: 'views/feed.html',
            controller: 'feedCtrl'
        })

        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        });

    $locationProvider.html5Mode(true);

}]);