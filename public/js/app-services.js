// app-services.js

(function(){

    var app = angular.module('plataformaApp-services', []);

    /**
     * Serviços de USUARIOS/PARTICIPANTES
     */
    app.factory('usuarioService',['$http', function($http) {

        var urlBase = '/api/usuario';

        var usuarioFactory = {};
        
        usuarioFactory.consultarUsuarios = function() {
            return $http.get(urlBase);
        }        

        usuarioFactory.consultarUsuario = function(id) {
            return $http.get(urlBase + '/' + id);
        }        

        usuarioFactory.incluirUsuario = function(usuario) {
            return $http.post(urlBase, usuario);
        }        

        usuarioFactory.atualizarUsuario = function(usuario) {
            return $http.put(urlBase + '/' + usuario._id, usuario);
        }        

        usuarioFactory.excluirUsuario = function(id) {
            return $http.delete(urlBase + '/' + id);
        }        

        usuarioFactory.loginUsuario = function(usuario) {
            return $http.post(urlBase + '/login', usuario);
        }        

        return usuarioFactory;

    }]);


    /**
     * Serviços de DESAFIO
     */
    app.factory('desafioService',['$http', function($http) {

        var urlBase = '/api/desafio';

        var desafioFactory = {};

        desafioFactory.consultarDesafios = function() {
            return $http.get(urlBase);
        }        

        desafioFactory.consultarDesafio = function(id) {
            return $http.get(urlBase + '/' + id);
        }        

        desafioFactory.incluirDesafio = function(desafio) {
            return $http.post(urlBase, desafio);
        }        

        desafioFactory.atualizarDesafio = function(desafio) {
            return $http.put(urlBase + '/' + desafio._id, desafio);
        }        

        desafioFactory.excluirDesafio = function(id) {
            return $http.delete(urlBase + '/' + id);
        }        

        return desafioFactory;

    }]);


    /**
     * Serviços de FEEDS
     */
    app.factory('feedService',['$http', function($http) {

        var urlBase = '/api/feed';

        var feedFactory = {};

        /*
        feedFactory.consultarFeeds = function() {
            return $http.get(urlBase);
        } 
        */       
        feedFactory.consultarFeedsLimite = function(qtd) {
            return $http.get(urlBase + '/limite/' + qtd);
        } 

        feedFactory.consultarFeed = function(id) {
            return $http.get(urlBase + '/' + id);
        }        

        feedFactory.incluirFeed = function(feed) {
            return $http.post(urlBase, feed);
        }        

        feedFactory.atualizarFeed = function(feed) {
            return $http.put(urlBase + '/' + feed._id, feed);
        }        

        feedFactory.excluirFeed = function(id) {
            return $http.delete(urlBase + '/' + id);
        }        

        return feedFactory;

    }]);

})();