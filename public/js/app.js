// public/js/app.js
(function(){
	var app = angular.module('plataformaApp', []);

	app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.welcome = 'Seja Bem Vindo!';
        $scope.usuario = undefined;
        $scope.feeds = [];
        $scope.feedsDestaque = [];
        
        $scope.doLogin = function(user) {
            $scope.usuario = user;
            console.log('usuario', user);
        };

        $scope.doLogout = function() {
            console.log('doLogout angularJS');
            $scope.usuario = undefined;
        };

        $scope.getFeeds = function(qtd, cb) {
            $http.get('http://localhost:8080/feed/limite/'+qtd).
                success(function(data, status) {
                    if (data.sucesso) {
                        cb(data.feeds);
                        console.log('home feeds', data.feeds);
                    }
                }).
                error(function(err, status) {
                    console.log('erro ao consultar feeds para home', err);
                });
        };

        $scope.buscaFeeds = function(cb){
            $scope.getFeeds(30, cb);
        };

        $scope.buscaFeedsDestaque = function(cb){
            $scope.getFeeds(3, cb);
        };

        $scope.buscaFeeds(function(feeds){
            $scope.feeds = feeds;
        });

        $scope.buscaFeedsDestaque(function(feeds){
            $scope.feedsDestaque = feeds;
        });

	}]);


})();

