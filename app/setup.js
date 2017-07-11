// setup.js
var Usuario      = require('./models/usuario');
var Feed         = require('./models/feed');
var mongoose     = require('mongoose');
var ObjectId     = mongoose.Types.ObjectId;
var passwordHash = require('password-hash');

var setup = {
    
    run  : function(req, res) {

        // cria usuario
        var user = new Usuario({
            nome: 'João Silva',
            email: 'joao@gmail.com',
            telefone: '21 55555-6666',
            role: 'admin',
            senha: passwordHash.generate('123')
        });

        Usuario.findOne({email: user.email}, function(err, usuario){
            if (err) {
                //res.json({ sucesso: false, mensagem: 'Erro desconhecido', erro: err });
                console.log('Erro ao tentar criar usuario [setup]');
            } else {
                if (usuario) {
                    //res.json({ sucesso: false, mensagem: 'Usuário com esse email já cadastrado!', erro: {mensagem: 'Falha ao tentar criar um novo usuário'} });
                    console.log('Usuário já existe! [setup]')
                } else {
                    user.save(function(err) {
                        if (err) {
                            console.log('Erro ao tentar criar usuario 2 [setup]');
                        } else {
                            //res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuario: user });
                            console.log('Usuário criado');

                            // FEEDS
                            for (var i = 0; i < textosFeed.length; i++) {
                                // CADASTRA FEEDS INICIAIS
                                var feed = new Feed({
                                    texto: textosFeed[i],
                                    usuario: user._id
                                });
                                
                                feed.save(function(err) {
                                    if (err) {
                                        //res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo feed', erro: err });
                                    } else {
                                        //console.log('usuario salvo!');
                                        //res.json({ sucesso: true, mensagem: 'realizado com sucesso', feed: feed });
                                        console.log('Feed criado!');
                                    }
                                });
                            }


                        }
                    });
                }
            }
        });

        console.log('usuario', user);

        res.json({usuario: user});
    }
};

var textosFeed = [ 'Espero ver todos vocês nos próximos desafios que estão por vir!! Até lá... ',
    'Eu gostaria de saber se vocês tem informação sobre material disponível online? ebooks?',
'Estes eventos são realizados em todo o Brasil ou são acontecem apenas em alguns estados?'];

module.exports = setup;