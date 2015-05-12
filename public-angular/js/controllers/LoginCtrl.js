// public/js/controllers/LoginCtrl.js
(function(){

	var app = angular.module('LoginCtrl', []);
	
	app.controller('LoginController', function($scope) {

	    $scope.tagline = 'To the moon and back!';   
	    $scope.showLogin = true;

	    $scope.username = '';

	    console.log('showLogin : ' + $scope.showLogin);

	    this.doLogin = function() {
	    	alert("Teste...");
	    };

	});



})();

