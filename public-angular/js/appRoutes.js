// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/personagens', {
            templateUrl: 'views/personagem.html',
            controller: 'PersonagemController',
            controllerAs: 'perctrl'
        })

        // nerds page that will use the NerdController
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'loginctrl'
        })

        ;

    $locationProvider.html5Mode(true);

}]);