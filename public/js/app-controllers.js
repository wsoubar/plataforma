// app-controllers.js

(function(){

    var app = angular.module('plataformaApp-controllers', ['ngStorage']);

    app.controller('mainCtrl', ['$scope', '$http', '$interval', '$localStorage', 
        function($scope, $http, $interval, $localStorage) {

        $scope.welcome = 'Seja Bem Vindo!';

        $scope.usuario = undefined;
        $scope.token   = undefined;

        if ($localStorage.usuario) {
            $scope.usuario = $localStorage.usuario;
            $scope.token   = $localStorage.token;
        }
        $scope.feeds = [];
        $scope.feedsDestaque = [];

        
        var intervaloFeedsDestaque = $interval(function(){
                $scope.buscaFeedsDestaque(function(feeds){
                    $scope.feedsDestaque = feeds;
                })
            }, 300000); // 300000 = 5 minutos
       

        $scope.doLogin = function(loginData) {
            $scope.usuario = loginData.usuario;
            $localStorage.usuario = loginData.usuario;
            console.log('usuario', loginData.usuario);
            $scope.token = loginData.token;
            $localStorage.token = loginData.token;
            console.log('token', loginData.token);
        };

        $scope.doLogout = function() {
            delete $scope.usuario;
            delete $localStorage.usuario;

            delete $scope.token;
            delete $localStorage.token;
        };

        $scope.getFeeds = function(qtd, cb) {
            $http.get('/feed/limite/'+qtd).
                success(function(data, status) {
                    if (data.sucesso) {
                        cb(data.feeds);
                        //console.log('home feeds', data.feeds);
                    }
                }).
                error(function(err, status) {
                    console.log('erro ao consultar feeds para home', err);
                });
        };



        $scope.enviaComentario = function() {

            var feed = { 
                texto: $scope.textoComentario,
                usuarioId: $scope.usuario._id, 
                token: $scope.token
            };

            console.log('$scope.textoComentario', $scope.textoComentario);
            console.log('$scope.usuario', $scope.usuario);
            console.log('$scope.usuario.id', $scope.usuario._id);

            $http.post('/feed', feed).
                success(function(data, status){
                    //console.log('feed adicionado??', data)
                    $scope.buscaFeeds(function(feeds){
                        $scope.feeds = feeds;
                    });
                    $scope.textoComentario = '';
                }).
                error(function(err){
                    console.log('erro adicionando feed', err)
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
