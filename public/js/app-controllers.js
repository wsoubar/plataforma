// app-controllers.js

(function(){

    var app = angular.module('plataformaApp-controllers', ['ngStorage']);

    app.controller('mainCtrl', ['$rootScope', '$scope', '$http', '$interval', '$localStorage', '$location', 
        function($rootScope, $scope, $http, $interval, $localStorage, $location) {

        $scope.feedsDestaque = [];

        $scope.welcome = 'Seja Bem Vindo!';
        $rootScope.css = 'united';
        $rootScope.usuario = undefined;
        $rootScope.token   = undefined;

        if ($localStorage.usuario) {
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.token   = $localStorage.token;
        }
        if ($localStorage.css) {
            $rootScope.css = $localStorage.css;
        }
        
        /*
        var intervaloFeedsDestaque = $interval(function(){
                $scope.buscaFeedsDestaque(function(feeds){
                    $scope.feedsDestaque = feeds;
                })
            }, 300000); // 300000 = 5 minutos
        */


        $scope.getFeeds = function(qtd, cb) {
            $http.get('/api/feed/limite/'+qtd).
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


        $scope.doLogout = function() {
            console.log('doLogout()');
            delete $rootScope.usuario;
            delete $localStorage.usuario;

            delete $scope.token;
            delete $localStorage.token;
            $location.path('/');
        };

        $scope.buscaFeedsDestaque = function(cb){
            $scope.getFeeds(3, cb);
        };

        $scope.buscaFeedsDestaque(function(feeds){
            $scope.feedsDestaque = feeds;
        });

    }]);
    

    /**
     * controller da navbar
     */
    app.controller('NavbarCtrl', ['$scope', '$window', function($scope, $window){
        $scope.isCollapsed = true;
        $scope.isLogged = false;
        //alert("screen width " + $window.innerWidth);
        
        this.screenWidth = function() {
            alert("screen width " + $window.innerWidth);
        };
    }]);


    /**
     *
     * Login Controller
     * 
     */
    app.controller('loginCtrl', [ '$rootScope','$scope','$http', '$localStorage', '$location', 
        function($rootScope, $scope, $http, $localStorage, $location) {

        $scope.showLogin = true;

        $scope.username = '';
        $scope.password = '';

        $scope.doLogin = function() {

            $http.post('/api/login', {email: $scope.username, senha: $scope.password}).
                success(function(data, status){
                    /*
                        usando $rootScope para que o usuario seja atualizado fora no ng-view
                    */
                    //$scope.usuario = data.usuario;
                    $rootScope.usuario = data.usuario;
                    $localStorage.usuario = data.usuario;
                    console.log('usuario', data.usuario);

                    //$scope.token = data.token;
                    $rootScope.token = data.token;
                    $localStorage.token = data.token;
                    console.log('token', data.token);
                    $location.path('/feed');
                }).
                error(function(err) {
                    console.log('Erro ao chamar o Login', err)
                });

        };
    }]);


    /**
     *
     * Desafio Controller
     * 
     */
    app.controller('desafioCtrl', ['$scope', '$http', function($scope, $http) {
        
        //$scope.mensagemSucesso = undefined;
        //$scope.mensagemErro = undefined;
        $scope.postDesafio = function() {
            console.log('postDesafio');
    
            if (!$scope.nome || !$scope.email || !$scope.telefone || !$scope.desafio) {
                alert('Preencha todos os campos do formulário.');
                return;
            }

            var desafio = {
                nome: $scope.nome,
                email: $scope.email,
                telefone: $scope.telefone,
                desafio: $scope.desafio
            };

            $http.post('/api/desafio', desafio).
                success(function(data, status){
                    console.log('data', data);
                    $scope.nome = '';
                    $scope.email = '';
                    $scope.telefone = '';
                    $scope.desafio ='';
                    $scope.desafioForm.$setPristine(true); 
                    $scope.mensagemSucesso = 'Desafio enviado com sucesso!';

                }).
                error(function(err) {
                    console.log('Err', err)
                    $scope.mensagemErro = 'Ocorreu um erro inesperado. Teste mais tarde!';                    
                });
        };

        $scope.clean = function(){
            $scope.mensagemSucesso = undefined;
            $scope.mensagemErro = undefined;
        };

        $scope.clean();
        // $scope.mensagemSucesso = "Sucesso!! ";

    }]);

    /**
     *
     * Participe Controller
     * 
     */
    app.controller('participeCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.postParticipante = function(){

            console.log('postParticipante');

            if (!$scope.nome || !$scope.email || !$scope.telefone || !$scope.senha) {
                alert('Preencha todos os campos do formulário.');
                return;
            }

            var part = {
                nome: $scope.nome,
                email: $scope.email,
                telefone: $scope.telefone,
                senha: $scope.senha
            };

            console.log('participante', part);
            
            $http.post('/api/usuario', part).
                success(function(data, status){
                    if (data.sucesso) {
                        console.log('data', data);
                        $scope.nome = '';
                        $scope.email = '';
                        $scope.telefone = '';
                        $scope.senha ='';
                        $scope.confirmarSenha ='';
                        $scope.participanteForm.$setPristine(true); 
                        $scope.mensagemSucesso = 'Participante cadastrado com sucesso! Faça login agora.';   
                    } else {
                        $scope.mensagemErro = data.mensagem;
                    }
                }).
                error(function(err){
                    console.log('Erro ao tentar incluir participante', err);
                    $scope.mensagemErro = 'Ocorreu um erro inesperado. Teste mais tarde!';      
                });
            
        };

        $scope.clean = function(){
            $scope.mensagemSucesso = undefined;
            $scope.mensagemErro = undefined;
        };

        $scope.clean();

    }]);

    /**
     *
     * Feed Controller
     * 
     */
    app.controller('feedCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.feeds = [];

        $scope.enviaComentario = function() {

            if (!$scope.textoComentario) {
                return;
            }

            var feed = { 
                texto: $scope.textoComentario,
                usuarioId: $scope.usuario._id, 
                token: $scope.token
            };

            /*
            console.log('$scope.textoComentario', $scope.textoComentario);
            console.log('$scope.usuario', $scope.usuario);
            console.log('$scope.usuario.id', $scope.usuario._id);
            */

            $http.post('/api/feed', feed).
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

        $scope.buscaFeeds(function(feeds){
            $scope.feeds = feeds;
        });



    }]);

    /**
     *
     * Home Controller
     * 
     */
    app.controller('homeCtrl', ['$scope', function($scope) {
    }]);

    /**
     *
     * IoT Controller
     * 
     */
    app.controller('iotCtrl', ['$scope', function($scope) {
    }]);

    /**
     *
     * Dashboard Controller
     * 
     */
    app.controller('dashboardCtrl', ['$scope', function($scope) {
        $scope.pages = {
            p1: 'views/inc-dash/inc-desafios.html',
            p2: 'views/inc-dash/inc-participantes.html',
            p3: 'views/inc-dash/inc-feeds.html',
            p4: 'views/inc-dash/inc-config.html'
        };

        $scope.subpage = 'p1';
        $scope.qtdDesafios = 15;


    }]);

    /**
     *
     * Hackathon Controller
     * 
     */
    app.controller('hackathonCtrl', ['$scope', '$sce', function($scope, $sce) {
        // usa o $sce.trustAsResourceUrl para validar a url para uso (sem isso não funciona)
        $scope.video = $sce.trustAsResourceUrl('https://www.youtube.com/embed/hTWKbfoikeg');
    }]);


})();
