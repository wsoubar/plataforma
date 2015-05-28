// public/js/appRoutes.js
    angular.module('plataformaApp-routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
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