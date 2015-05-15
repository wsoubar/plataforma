// public/js/app.js
(function(){
	var app = angular.module('plataformaApp', []);

	app.controller('mainCtrl', ['$scope', function($scope) {

		$scope.login = function() {
			$scope.logado = true;
		};

		$scope.logout = function(){
			$scope.logado = false;
		};

	}]);

})();

