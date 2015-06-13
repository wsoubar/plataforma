// app-controllers.js

(function (){

    var app = angular.module('plataformaApp-controllers', []);

    /*
     Controller principal de entrada
    */
    app.controller('mainCtrl', ['$rootScope', '$scope', '$localStorage', '$location', 
        function ($rootScope, $scope, $localStorage, $location) {

        /* if ($localStorage.css) {
            $rootScope.css = $localStorage.css;
        } else {
            $rootScope.css = 'flatly';
        }*/

        $scope.welcome = 'Seja Bem Vindo!';
        $rootScope.usuario = undefined;
        $rootScope.token   = undefined;

        // $scope.acss = ['flatly', 'united', 'darkly', 'journal', 'default'];
        // $scope.cssIdx = 0;

        // só pra testes
        /*
        $scope.trocaCss = function () {
            $rootScope.css = $scope.acss[$scope.cssIdx++];
            if ($scope.cssIdx > 3) $scope.cssIdx = 0;
        };
        */

        if ($localStorage.usuario) {
            $rootScope.usuario = $localStorage.usuario;
            $rootScope.token   = $localStorage.token;
        }

   
        $scope.doLogout = function () {
            console.log('doLogout()');
            if (confirm('Sair?')) {
                delete $rootScope.usuario;
                delete $localStorage.usuario;

                delete $scope.token;
                delete $localStorage.token;
                $location.path('/');
            }
        };

    }]);
    

    /**
     * controller da navbar
     */
    app.controller('NavbarCtrl', ['$scope', '$window', function ($scope, $window){
        $scope.isCollapsed = true;
        $scope.isLogged = false;
        //alert("screen width " + $window.innerWidth);
        
        this.screenWidth = function () {
            alert("screen width " + $window.innerWidth);
        };
    }]);


    /**
     *
     * Login Controller
     * 
     */
    app.controller('loginCtrl', [ '$rootScope','$scope','$localStorage', '$location', 'usuarioService', 
        function ($rootScope, $scope, $localStorage, $location, usuarioService) {

        $scope.username = '';
        $scope.password = '';

        $scope.doLogin = function () {

            usuarioService.loginUsuario({email: $scope.username, senha: $scope.password}).
                success(function (data, status){

                    if (data.sucesso) {
                        /*
                            usando $rootScope para que o usuario seja atualizado fora no ng-view
                        */
                        //$scope.usuario = data.usuario;
                        $rootScope.usuario = data.usuario;
                        $localStorage.usuario = data.usuario;
                        //console.log('usuario', data.usuario);

                        //$scope.token = data.token;
                        $rootScope.token = data.token;
                        $localStorage.token = data.token;
                        //api.init(token);
                        //console.log('token', data.token);
                        $location.path('/perfil');
                    } else {
                        console.log('Erro: '+ data.mensagem);
                        $scope.mensagemLogin = data.mensagem;
                    }
                }).
                error(function (err) {
                    console.log('Erro ao chamar o Login', err);
                    $scope.mensagemLogin = err;
                });

        };
    }]);


    /**
     *
     * Desafio Controller
     * 
     */
    app.controller('desafioCtrl', ['$scope', 'desafioService', function ($scope, desafioService) {
        
        //$scope.mensagemSucesso = undefined;
        //$scope.mensagemErro = undefined;
        $scope.postDesafio = function () {
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
                success(function (data, status){
                    console.log('data', data);
                    $scope.nome = '';
                    $scope.email = '';
                    $scope.telefone = '';
                    $scope.desafio ='';
                    $scope.desafioForm.$setPristine(true); 
                    $scope.mensagemSucesso = 'Desafio enviado com sucesso!';

                }).
                error(function (err) {
                    console.log('Err', err)
                    $scope.mensagemErro = 'Ocorreu um erro inesperado. Teste mais tarde!';                    
                });
        };

        $scope.clean = function (){
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
    app.controller('participeCtrl', ['$scope', 'usuarioService', function ($scope, usuarioService) {

        $scope.postParticipante = function (){

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
                success(function (data, status){
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
                error(function (err){
                    console.log('Erro ao tentar incluir participante', err);
                    $scope.mensagemErro = 'Ocorreu um erro inesperado. Teste mais tarde!';      
                });
            
        };

        $scope.clean = function (){
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
    app.controller('feedCtrl', ['$scope', 'feedService', function ($scope, feedService) {
        $scope.feeds = [];

        $scope.enviaComentario = function () {

            if (!$scope.textoComentario) {
                return;
            }

            var feed = { 
                texto: $scope.textoComentario,
                usuarioId: $scope.usuario._id, 
                token: $scope.token
            };

            feedService.incluirFeed(feed)
                .success(function (data, status) {
                    // busca novos feedbacks após a inclusão:
                    feedService.consultarFeedsLimite(30).
                        success(function (data, status){
                            if (data.sucesso) {
                                $scope.feeds = data.feeds;
                            }
                            $scope.textoComentario = '';
                        }).
                        error(function (err){
                            console.log('erro adicionando feed', err)
                        });
                })
                .error(function (err){
                    console.log('erro adicionando feed', err)
                });

        };

        // carrega feeds ao entrar na página
        feedService.consultarFeedsLimite(30).
            success(function (data, status){
                if (data.sucesso) {
                    $scope.feeds = data.feeds;
                }
                $scope.textoComentario = '';
            }).
            error(function (err){
                console.log('erro adicionando feed', err)
            });

    }]);

    /**
     *
     * Feed Controller
     * 
     */
    app.controller('perfilCtrl', ['$scope', '$rootScope', 'feedService', 'Upload', '$localStorage', 'usuarioService',
    function ($scope, $rootScope, feedService, Upload, $localStorage, usuarioService) {
        $scope.feeds = [];
        $scope.isEditingUser = false;

        $scope.enviaComentario = function () {

            if (!$scope.textoComentario) {
                return;
            }

            var feed = { 
                texto: $scope.textoComentario,
                usuarioId: $scope.usuario._id, 
                token: $scope.token
            };

            feedService.incluirFeed(feed)
                .success(function (data, status) {
                    // busca novos feedbacks após a inclusão:
                    feedService.consultarFeedsLimite(30).
                        success(function (data, status){
                            if (data.sucesso) {
                                $scope.feeds = data.feeds;
                            }
                            $scope.textoComentario = '';
                        }).
                        error(function (err){
                            console.log('erro adicionando feed', err)
                        });
                })
                .error(function (err){
                    console.log('erro adicionando feed', err)
                });

        };


        /*
         * UPLOAD
         */

        //$scope.model = {};
        $scope.foto = [];
        $scope.uploadProgress = 0;
    
        $scope.$watch('foto', function () {
            $scope.uploadFile($scope.foto);
        });

        $scope.uploadFile = function () {

            var file;
            if ($scope.foto) {
                file = $scope.foto[0];  
            } 
            if (!file) return;

            console.log('uploadfile()');
            console.log('file', file);

            $scope.upload = Upload.upload({
                url: '/api/photo',
                method: 'POST',
                data: angular.toJson($rootScope.usuario),
                file: file
            }).progress(function (evt) {
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
                console.log('uploadProgress', $scope.uploadProgress);
            }).success(function (data) {
                console.log('Sucesso no upload');
                console.log('data', data);
                $rootScope.usuario.foto = '/uploads/' + data.files.file.name;
            });
        };


        $scope.salvarPerfil = function () {

            console.log('salva perfil');
            
            usuarioService.atualizarUsuario($rootScope.usuario).
                success(function (data, status) {
                    if (data.sucesso) {
                        console.log('data', data);
                        $scope.isEditingUser = false;
                        $localStorage.usuario = $rootScope.usuario;
                    } else {
                        $scope.mensagemErro = data.mensagem;
                        console.log('Erro >', data);
                    }
                }).
                error(function (err){
                    console.log('Erro ao tentar incluir participante', err);
                    $scope.mensagemErro = 'Ocorreu um erro inesperado. Teste mais tarde!';      
                });
        };

        $scope.cancelarEdicaoPerfil = function (){
            $scope.isEditingUser = false;
            // $rootScope.usuario = undefined;

            // busca a informação do usuário para sobrescrever qualquer edição
            // acho que posso melhorar isso mais depois
            usuarioService.consultarUsuario($rootScope.usuario._id).
                success(function (data){
                    if (data.sucesso) {
                        $rootScope.usuario = data.usuario;
                    } else {
                        console.log('erro >', data);
                    }
                }).
                error(function (err) {
                    console.log('Erro >', err);
                });

            // $rootScope.usuario = $localStorage.usuario;
            console.log('edicao do perfil cancelada!');
        };

        // carrega feeds ao entrar na página
        feedService.consultarFeedsLimite(30).
            success(function (data, status){
                if (data.sucesso) {
                    $scope.feeds = data.feeds;
                }
                $scope.textoComentario = '';
            }).
            error(function (err){
                console.log('erro adicionando feed', err)
            });

    }]);


    /**
     *
     * Home Controller
     * 
     */
    app.controller('homeCtrl', ['$scope', '$rootScope', 'feedService', '$interval', function ($scope, $rootScope, feedService, $interval) {

        var feedsDestaque = [];
        $scope.feed = undefined;
        var feedIdx = 0;
        
            
        feedService.consultarFeedsLimite(3).
            success(function (data, status) {
                if (data.sucesso) {
                    feedsDestaque = data.feeds;
                    $scope.feed = data.feeds[0];
                    feedIdx++;
                }
            }).
            error(function (err, status) {
                console.log('erro ao consultar feeds para home', err);
            });

        var intervaloFeedsDestaque = $interval(function (){
            $scope.feed = feedsDestaque[feedIdx++];
            if (feedIdx >= feedsDestaque.length) {
                feedIdx = 0;
            }
        }, 20000); // 300000 = 5 minutos

    }]);

    /**
     *
     * IoT Controller
     * 
     */
    app.controller('iotCtrl', ['$scope', function ($scope) {
    }]);


    /**
     *
     * Hackathon Controller
     * 
     */
    app.controller('hackathonCtrl', ['$scope', '$sce', function ($scope, $sce) {
        // usa o $sce.trustAsResourceUrl para validar a url para uso (sem isso não funciona)
        $scope.video = $sce.trustAsResourceUrl('https://www.youtube.com/embed/hTWKbfoikeg');
    }]);

})();
