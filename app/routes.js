// app/routes.js
var path = require('path');

var desafioDao = require('./daos/desafioDao');
var Usuario = require('./models/usuario');
var Feed = require('./models/feed');

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

    app.post('/participante', function(req, res) {

        var u = new Usuario({
            nome: req.body.name,
            email: req.body.email,
            telefone: req.body.phone,
            senha: req.body.senha
        });
        
        //console.log('senhap: ' + req.body.senhap);
        //console.log('usuario -> ', u);

        u.save(function(err) {
            if (err) {
                console.log(err);
                return handleError(err);
            }
            console.log('participante salvo!');

            Usuario.findById(u, function(err, usuario) {
                if (err) {
                    console.log(err);
                    return handleError(err);
                }
                //console.log(usuario);
            });
        });
        res.json({ sucesso: true, mensagem: 'realizado com sucesso' });
    });





    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    app.use(function(err, req, res) {
        switch (err.name) {
            case 'CastError':
                console.log(err);
                res.status(400); // Bad Request
                return res.send('400');
            default:
                console.log(err);
                res.status(500); // Internal server error
                return res.send('500');
        }
    });


};