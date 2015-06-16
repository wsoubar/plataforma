var mongoose = require('mongoose');
var Configuracoes = require('../models/configuracoes');
var ObjectId = mongoose.Types.ObjectId;

var configs = {
    // cria um novo usuario
    create  : function(req, res) {

        var configs = new Configuracoes({});
        
        configs.save(function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar criar', erro: err });
            } else {
                //console.log('usuario salvo!');
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', configuracoes: configs });
            }
        });
    },

    findOne : function(req, res) {

        Configuracoes.findOne({}, function(err, configs) {
            if (configs) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', configuracoes: configs });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar as configurações', erro: err });
            }

        });
    },

    update  : function(req, res) {
        
        var configsAtu = req.body.configuracoes;

        Configuracoes.findOneAndUpdate({}, configsAtu, function(err, configs) {
            if (configs) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', configuracoes: configs });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar as configurações', erro: err });
            }
            //console.log(desafio);
        });
    },

   
};

module.exports = configs;