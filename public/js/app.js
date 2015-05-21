// public/js/app.js
(function(){
	var app = angular.module('plataformaApp', []);

	app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.welcome = 'Seja Bem Vindo!';

        $scope.usuario = undefined;

        $scope.homeFeeds = [];
        
        $http.get('http://localhost:8080/feed/limite/3').
            success(function(data, status) {
                if (data.sucesso) {
                    $scope.homeFeeds = data.feeds;
                    console.log('home feeds', data.feeds);
                }
            }).
            error(function(err, status) {
                console.log('erro ao consultar feeds para home', err);
            });

        //this.getHomeFeeds();

        $scope.doLogin = function(user) {
            $scope.usuario = user;
            console.log('usuario', user);
        };

        $scope.doLogout = function() {
            console.log('doLogout angularJS');
            $scope.usuario = undefined;
        };

        $scope.getFeeds = function(qtd) {

            $http.get('http://localhost:8080/feed/limite/'+qtd).
                success(function(data, status) {
                    if (data.sucesso) {
                        $scope.homeFeeds = data.feeds;
                        console.log('home feeds', data.feeds);
                    }
                }).
                error(function(err, status) {
                    console.log('erro ao consultar feeds para home', err);
                });
        };

        $scope.buscaFeeds = function(){
            $scope.getFeeds(30);
        };

        $scope.buscaFeedsDestaque = function(){
            $scope.getFeeds(3);
        };


	}]);


})();

