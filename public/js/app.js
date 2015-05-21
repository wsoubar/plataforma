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


    app.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {

        this.doLogin = function(){

            alert('Login');

        };

    }]);

})();

