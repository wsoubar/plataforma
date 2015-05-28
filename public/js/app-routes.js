// public/js/appRoutes.js
    angular.module('plataformaApp-routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        })

        .when('/iot', {
            templateUrl: 'views/iot.html',
            controller: 'mainCtrl'
        })

        .when('/hackathon', {
            templateUrl: 'views/hackathon.html',
            controller: 'mainCtrl'
        })

        .when('/desafio', {
            templateUrl: 'views/desafio.html',
            controller: 'mainCtrl'
        })

        .when('/participe', {
            templateUrl: 'views/participe.html',
            controller: 'mainCtrl'
        })

        .when('/feed', {
            templateUrl: 'views/feed.html',
            controller: 'mainCtrl'
        })
        // nerds page that will use the NerdController
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })

        //.otherwise(res.);
        ;

    $locationProvider.html5Mode(true);

}]);