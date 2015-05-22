var mongoose = require('mongoose');
var Feed = require('../models/feed');
var ObjectId = mongoose.Types.ObjectId;

var feeds = {
    // cria um novo usuario
    create  : function(req, res) {

        if (!req.body.texto || !req.body.usuarioId) {
            res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo feed', erro: {mensagem: 'Parâmetros inválidos'} });
            return;
        }

        var feed = new Feed({
            texto: req.body.texto,
            usuario: new ObjectId(req.body.usuarioId)
        });
        
        feed.save(function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo feed', erro: err });
            } else {
                //console.log('usuario salvo!');
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', feed: feed });
            }
        });
    },

    findOne : function(req, res) {

        var id = req.params.id;

        Feed.findOne({_id: id}).
        populate('usuario').exec(function(err, feed) {
            console.log('feed', feed);
            if (feed) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', feed: feed });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o feed', erro: err });
            }

        });
    },

    findLimite : function(req, res) {

        var qtd = Number(req.params.qtd);

        Feed.find({}).
        sort({data: 'desc'}).
        limit(qtd).
        populate('usuario').exec(function(err, feeds) {
            if (feeds) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', feeds: feeds });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar os feeds', erro: err });
            }
        });
    },

    findAll : function(req, res) {
        Feed.find({}).
        populate('usuario').exec(function(err, feeds) {
            if (feeds) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', feeds: feeds });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar os feeds', erro: err });
            }
        });
    },

    update  : function(req, res) {
        var id = req.params.id;
        
        var feedAtu = {
            texto: req.body.texto
        };

        Feed.findOneAndUpdate({_id: id}, feedAtu).populate('usuario').exec(function(err, feed) {
            if (feed) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', feed: feed });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o feed', erro: err });
            }
            //console.log(desafio);
        });
    },

    delete  : function(req, res) {
        
        var id = req.params.id;

        Feed.findOneAndRemove({_id: id}, function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar excluir o feed', erro: err });
            } else {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso' });
            }
        });
    }
    
};

module.exports = feeds;