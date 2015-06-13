// dashbard-controllers

(function (){

    var app = angular.module('plataformaApp-dashboard-ctrl', []);

    /**
     *
     * Dashboard Controller
     * 
     */
    app.controller('dashboardCtrl', ['$rootScope', '$scope', 'desafioService', 'usuarioService', 'desafioService', '$http',
    function ($rootScope, $scope, desafioService, usuarioService, desafioService, $http) {
        
        $scope.pages = {
            desafios: 'views/inc-dash/inc-desafios.html',
            atenderDesafio: 'views/inc-dash/inc-desafio-atende.html',
            participantes: 'views/inc-dash/inc-participantes.html',
            detalhesParticipante: 'views/inc-dash/inc-participante-det.html',
            feeds: 'views/inc-dash/inc-feeds.html',
            config: 'views/inc-dash/inc-config.html'
        };

        $scope.subpage  = 'desafios';
        $scope.desafios = [];
        $scope.desafio  = undefined;
        //$scope.opcao = $scope.pages[$routeParams.opcao];

        $scope.listarDesafios = function (){
            // busca desafios
            desafioService.consultarDesafios().
                success(function (data){
                    if (data.sucesso) {
                        $scope.desafios = data.desafios;
                        $scope.qtdDesafios = $scope.desafios.length;
                    } else {
                        console.log('erro: ', data.mensagem, data);
                    }
                }).
                error(function (err){
                    console.log('err', err);
                });

        };

        $scope.listaParticipantes = function () {
            // busca desafios
            usuarioService.consultarUsuarios().
                success(function (data){
                    if (data.sucesso) {
                        $scope.participantes = data.usuarios;
                        $scope.qtdParticipantes = $scope.participantes.length;
                    } else {
                        console.log('erro: ', data.mensagem, data);
                    }
                }).
                error(function (err){
                    console.log('err', err);
                });
        };

        $scope.atenderDesafio = function (desafio) {
            $scope.desafio = desafio;
            $scope.subpage = 'atenderDesafio';
        };

        $scope.anotacao = {};


        $scope.salvarAnotacao = function () {

            console.log('anotacao', $scope.anotacao);
            if (!$scope.anotacao.texto) { 
                console.log('Deu pau!!');
                return ;
            }

            console.log('salvarAnotacao', $scope.desafio, $scope.anotacao);

            if (!$scope.desafio.anotacoes) {
                $scope.desafio.anotacoes = [];
            }

            // adiciona anotação no array de anotacoes
            $scope.desafio.anotacoes.push({
                texto: $scope.anotacao.texto, 
                usuario: $rootScope.usuario                 
            });

            console.log('desafio >>', $scope.desafio);

            // atualiza desafio
            desafioService.atualizarDesafio($scope.desafio) .
                success(function (data, status) {
                    //console.log('data', data);
                    // se sucesso, busca informacoes atualizadas
                    if (data.sucesso) {
                        desafioService.consultarDesafio(data.desafio._id).
                            success(function (data, status) {
                                if (data.sucesso) {
                                    $scope.desafio = data.desafio;
                                }
                            }).
                            error(function (err) {
                                console.log('Erro > ', err);
                            });
                        $scope.anotacao.texto = '';
                        $scope.formAnotacao.$setPristine(true); 

                    } else {
                        console.log('Erro>', data);
                    }

                }).
                error(function (err){
                    console.log('Err', err);
                });
        };

        $scope.statusDedafio = [
            { nome: 'Novo', valor: 'novo' },
            { nome: 'Em andamento', valor: 'andamento' },
            { nome: 'Pendente', valor: 'pendente' },
            { nome: 'Finalizado', valor: 'finalizado' }
        ];


        $scope.detalhesParticipante = function (participante) {
            $scope.participante = participante;
            $scope.subpage = 'detalhesParticipante';
        };

        $scope.userRoles = [
            { nome: 'Usuário', valor: 'usuario'},
            { nome: 'Administrador', valor: 'admin'}
        ];


        $scope.salvarUsuario = function () {

            $scope.mensagemErro    = undefined;
            $scope.mensagemSucesso = undefined;

            usuarioService.atualizarUsuario($scope.participante).
                success(function (data, status){
                    if (data.sucesso) {
                        $scope.mensagemSucesso = 'Atualizado com sucesso';
                    } else {
                        console.log('Erro ao atualizar usuário', data);
                        $scope.mensagemErro = 'Erro na atualização, tente mais tarde.';
                    }
                }).
                error(function (err){
                    console.log('err >>', err);
                    $scope.mensagemErro = 'Erro na atualização, tente mais tarde.';
                });

        };

        $scope.limpaMensagens = function () {
            $scope.mensagemSucesso = undefined;
            $scope.mensagemErro = undefined;
        };

        /*
        $scope.chamaServicoLuiz = function () {
            console.log('chama serviço');
            $http.post('http://172.21.0.169:8180/sulamerica-ger-carteira-server/api/v1/simulacao', {valorAluguel: 1600.5, qtdMeses: 12}).
                success(function (data){
                    console.log('data >>>', data);
                }).
                error(function (err){
                    console.log('err >>>', err);
                });
        };
        */
        $scope.mudaTema = function (css) {
            console.log('muda tema');
            console.log('$scope.css', $scope.css);
            console.log('$rootScope.css', $rootScope.css);
            console.log('css', css);

            $rootScope.css = css;
        }

        $scope.listarDesafios();
        $scope.listaParticipantes();

    }]);


    app.controller('teste', function ($http) {


    });


})();