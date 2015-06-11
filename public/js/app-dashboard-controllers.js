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
            participantes: 'views/inc-dash/inc-participantes.html',
            feeds: 'views/inc-dash/inc-feeds.html',
            config: 'views/inc-dash/inc-config.html',
            atenderDesafio: 'views/inc-dash/inc-desafios-atende.html'
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
                $scope.desafio.anotacoes =[];
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

        $scope.listarDesafios();
        $scope.listaParticipantes();

    }]);



})();