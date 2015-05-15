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





    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};