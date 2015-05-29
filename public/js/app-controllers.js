// app-controllers.js

(function(){

    var app = angular.module('plataformaApp-controllers', ['ngStorage']);

    app.controller('mainCtrl', ['$rootScope', '$scope', '$interval', '$localStorage', '$location', 'feedService',
        function($rootScope, $scope, $interval, $localStorage, $location, feedService) {

        if ($localStorage.css) {
            $rootScope.css = $localStorage.css;
        } else {
            $rootScope.css = 'united';
        }

        $scope.feedsDestaque = [];

        $scope.welcome = 'Seja Bem Vindo!';
        $rootScope.usuario = undefined;
        $rootScope.token   = undefined;

        $scope.acss = ['flatly', 'united', 'darkly', 'journal'];
        $scope.cssIdx = 0;

        $scope.trocaCss = function() {
            
            $rootScope.css = $scope.acss[$scope.cssIdx++];
            if ($scope.cssIdx > 3) $scope.cssIdx = 0;
        };

        if ($localStorage.usuario) {
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.token   = $localStorage.token;
        }
        
        /*
        var intervaloFeedsDestaque = $interval(function(){
                $scope.buscaFeedsDestaque(function(feeds){
                    $scope.feedsDestaque = feeds;
                })
            }, 300000); // 300000 = 5 minutos
        */


        $scope.getFeeds = function(qtd, cb) {
            feedService.consultarFeedsLimite(qtd).
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
    app.controller('loginCtrl', [ '$rootScope','$scope','$localStorage', '$location', 'usuarioService', 
        function($rootScope, $scope, $localStorage, $location, usuarioService) {

        $scope.showLogin = true;

        $scope.username = '';
        $scope.password = '';

        $scope.doLogin = function() {

            usuarioService.loginUsuario({email: $scope.username, senha: $scope.password}).
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
                    $location.path('/perfil');
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
    app.controller('desafioCtrl', ['$scope', 'desafioService', function($scope, desafioService) {
        
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

            desafioService.incluirDesafio(desafio).
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
    app.controller('participeCtrl', ['$scope', 'usuarioService', function($scope, usuarioService) {

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
            
            usuarioService.incluirUsuario(part).
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
    app.controller('feedCtrl', ['$scope', 'feedService', function($scope, feedService) {
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

            feedService.incluirFeed(feed)
                .success(function(data, status) {
                    // busca novos feedbacks após a inclusão:
                    feedService.consultarFeedsLimite(30).
                        success(function(data, status){
                            if (data.sucesso) {
                                $scope.feeds = data.feeds;
                            }
                            $scope.textoComentario = '';
                        }).
                        error(function(err){
                            console.log('erro adicionando feed', err)
                        });
                })
                .error(function(err){
                    console.log('erro adicionando feed', err)
                });

        };

        // carrega feeds ao entrar na página
        feedService.consultarFeedsLimite(30).
            success(function(data, status){
                if (data.sucesso) {
                    $scope.feeds = data.feeds;
                }
                $scope.textoComentario = '';
            }).
            error(function(err){
                console.log('erro adicionando feed', err)
            });

    }]);

    /**
     *
     * Feed Controller
     * 
     */
    app.controller('perfilCtrl', ['$scope', '$rootScope', 'feedService', function($scope, $rootScope, feedService) {
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

            feedService.incluirFeed(feed)
                .success(function(data, status) {
                    // busca novos feedbacks após a inclusão:
                    feedService.consultarFeedsLimite(30).
                        success(function(data, status){
                            if (data.sucesso) {
                                $scope.feeds = data.feeds;
                            }
                            $scope.textoComentario = '';
                        }).
                        error(function(err){
                            console.log('erro adicionando feed', err)
                        });
                })
                .error(function(err){
                    console.log('erro adicionando feed', err)
                });

        };

        // carrega feeds ao entrar na página
        feedService.consultarFeedsLimite(30).
            success(function(data, status){
                if (data.sucesso) {
                    $scope.feeds = data.feeds;
                }
                $scope.textoComentario = '';
            }).
            error(function(err){
                console.log('erro adicionando feed', err)
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
