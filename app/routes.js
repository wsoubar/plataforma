// app/routes.js

// grab the nerd model we just created
var Personagem = require('./models/personagem');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/personagens', function(req, res) {
        // use mongoose to get all nerds in the database
        console.log('Chama mongodb');
        Personagem.find(function(err, personagens) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            console.log('achou personagens');
            if (err) {
                console.og('erro na chamada ao mongoDB')
                res.send(err);
            }

            res.json(personagens); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)

    app.get('/api/personagens/:new_personagem', function(req, res){
        console.log('add personagem');
        Personagem.create({
            name : req.params.new_personagem
        }, function(err, novoPersonagem) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Personagem.find(function(err, personagens) {
                if (err)
                    res.send(err)
                res.json(personagens);
            });
        });
    });

    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};