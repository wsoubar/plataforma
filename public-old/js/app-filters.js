// app-filters.js
(function(){

    var app = angular.module('plataformaApp-filters',[]);

    // filtro usado para  pegar o primeiro nome do participante
    // ex: 'Wagner Barbosa' | split : ' ' : 0
    app.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            if (input === undefined || input == '') {
                return input;
            }
            return input.split(splitChar)[splitIndex];
        }
    });

})();