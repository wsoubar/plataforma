// public/js/controllers/NerdCtrl.js

(function(){
	var persApp = angular.module('PersonagemCtrl', ['PersonagemService']);

	persApp.controller('PersonagemController', ['$scope', 'PersonagemSrvc', function($scope, PersonagemSrvc) {
		console.log('PersonagemController::entrou');
		var ctrl = this;
		this.personagens = [];

	    $scope.tagline = 'Nothing beats a pocket protector!';
		console.log('PersonagemController::listarPersonagens');

	    this.listarPersonagens = function() {
	    	PersonagemSrvc.get()
	    		.success(function(personagens) {
	    			console.log('Consulta personagens...');
	    			console.log(JSON.stringify(personagens));
	    			ctrl.personagens = personagens;
	    			//return personagens;
	    		})
	    		.error(function(){
	    			console.log('Error');
	    		});
	    };

	    ctrl.listarPersonagens();

	}]);	
})(); 

