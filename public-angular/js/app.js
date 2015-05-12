// public/js/app.js
(function(){
	var app = angular.module('sampleApp', ['ngRoute', 'ui.bootstrap', 'appRoutes', 'MainCtrl', 'LoginCtrl', 'PersonagemCtrl', 'PersonagemService']);

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


})();

