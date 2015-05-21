// app/routes.js
var path = require('path');

var desafioDao = require('./daos/desafioDao');
var usuarioDao = require('./daos/usuarioDao');
var feedDao = require('./daos/feedDao');

module.exports = function(app) {

    // server routes ===========================================================


    app.get('/teste', function(req, res){
        res.json({nome: 'Wagner', sobrenome: 'Barbosa'});
    });

    // DESAFIO
    app.post('/desafio', desafioDao.create);
    app.put('/desafio/:id', desafioDao.update);
    app.get('/desafio/:id', desafioDao.findOne);
    app.get('/desafio', desafioDao.findAll);
    app.delete('/desafio/:id', desafioDao.delete);

    // usuario / participante
    app.post('/usuario', usuarioDao.create);
    app.put('/usuario/:id', usuarioDao.update);
    app.get('/usuario/:id', usuarioDao.findOne);
    app.get('/usuario', usuarioDao.findAll);
    app.delete('/usuario/:id', usuarioDao.delete);

    // FEED
    app.post('/feed', feedDao.create);
    app.put('/feed/:id', feedDao.update);
    app.get('/feed/:id', feedDao.findOne);
    app.get('/feed', feedDao.findAll);
    app.delete('/feed/:id', feedDao.delete);


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });


};