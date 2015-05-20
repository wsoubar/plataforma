// desafioDao.js
var Desafio = require('../models/desafio');

var desafios = {
	// cria um novo desafio
	create  : function(req, res) {
        var d = new Desafio({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            desafio: req.body.desafio
        });
        
        d.save(function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo desafio', erro: err });
            } else {
                console.log('desafio salvo!');
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', desafio: d });
            }
        });
	},

	findOne : function(req, res) {

        var id = req.params.id;

        Desafio.find({id: id}, function(err, desafio) {
            if (desafio) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', desafio: desafio });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o desafio', erro: err });
            }
            //console.log(desafio);
        });
    },

	findAll : function(req, res) {
        Desafio.find({},function(err, desafios) {
            if (desafios) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', desafios: desafios });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar os desafios', erro: err });
            }
        });
    },

	update  : function(req, res) {
        var id = req.params.id;
        var desafioAtu = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            desafio: req.body.desafio
        };

        Desafio.findOneAndUpdate({id:id}, desafioAtu,function(err, desafio) {
            if (desafio) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', desafio: desafio });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o desafio', erro: err });
            }
            //console.log(desafio);
        });
    },

	delete  : function(req, res) {
        
        var id = req.params.id;

        Desafio.remove({id: id}, function(err, desafio) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar excluir um desafio', erro: err });
            } else {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso' });
            }
        });
    }
};

module.exports = desafios;