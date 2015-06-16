// public/js/app.js
(function(){

	var app = angular.module('plataformaApp', ['ngRoute', 'ngStorage', 'ngFileUpload', 'ui.bootstrap', 
        'plataformaApp-routes', 'plataformaApp-directives', 'plataformaApp-services', 'plataformaApp-filters', 
        'plataformaApp-controllers', 'plataformaApp-dashboard-ctrl']);

    app.run(function ($rootScope, configService, $localStorage) {
        
        $rootScope.temas = ['flatly', 'united', 'darkly', 'journal', 'default'];
        $rootScope.css = 'default';

        configService.consultar()
            .success(function (data) {
                if (data.sucesso) { 
                    $rootScope.configuracoes = angular.copy(data.configuracoes);
                    //console.log('data.configuracoes', $rootScope.configuracoes.tema);
                    $rootScope.css = $rootScope.configuracoes.tema;
                    //console.log('configuraçoes >', JSON.stringify(data.configuracoes));
                }
            })
            .error(function (err){
                console.log('Erro >', err);
            });
    });

})();

