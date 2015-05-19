// app/routes.js
var path = require('path');

var Desafio = require('./models/desafio');
var Usuario = require('./models/usuario');
var Feed = require('./models/feed');

module.exports = function(app) {

    // server routes ===========================================================

    // icluir desafio
    app.post('/salvaDesafio', function(req, res) {

        var d = new Desafio({
            nome: req.body.name,
            email: req.body.email,
            telefone: req.body.phone,
            desafio: req.body.message
        });
        
        d.save(function(err) {
            if (err) {
                console.log(err);
                return handleError(err);
            }
            console.log('desafio salvo!');

            Desafio.findById(d, function(err, desafio) {
                if (err) {
                    console.log(err);
                    return handleError(err);
                }
                console.log(desafio);
            });
        });
        res.json({ sucesso: true, mensagem: 'realizado com sucesso' });
/*        } catch (ex) {
            console.log('Err: ' + err); 
            res.status(503);
            res.json({ sucesso: false, mensagem: 'realizado com sucesso', err: err });
        }
*/
    });


    // icluir desafio
    app.post('/salvaParticipante', function(req, res) {

        var u = new Usuario({
            nome: req.body.name,
            email: req.body.email,
            telefone: req.body.phone,
            senha: req.body.senha
        });
        
        console.log('senhap: ' + req.body.senhap);
        console.log('usuario -> ', u);

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
                console.log(usuario);
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