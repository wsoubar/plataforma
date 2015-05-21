// desafioDao.js
var mongoose = require('mongoose');
var Usuario = require('../models/usuario');

var usuarios = {
    // cria um novo usuario
    create  : function(req, res) {
        var user = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        });
        
        user.save(function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo usuário', erro: err });
            } else {
                //console.log('usuario salvo!');
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuario: user });
            }
        });
    },

    findOne : function(req, res) {
        var id = req.params.id;
        Usuario.findOne({_id: id}, function(err, user) {
            if (user) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuario: user });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o usuario', erro: err });
            }
        });
    },

    login : function(req, res) {
        var email = req.body.email;
        var senha = req.body.senha;

        Usuario.findOne({email: email, senha: senha }, function(err, user) {
            if (user) {
                res.json({ sucesso: true, mensagem: 'Login realizado com sucesso', usuario: user });
            } else {
                res.json({ sucesso: false, mensagem: 'Usuário ou senha inválidos', erro: err });
            }
        });
    },

    findAll : function(req, res) {
        Usuario.find({},function(err, users) {
            if (users) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuarios: users });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar os usuarios', erro: err });
            }
        });
    },

    update  : function(req, res) {
        var id = req.params.id;
        var usuAtu = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        };
        Usuario.findOneAndUpdate({_id: id}, usuAtu,function(err, user) {
            if (user) {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuario: user });
            } else {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar buscar o usuario', erro: err });
            }
        });
    },

    delete  : function(req, res) {
        
        var id = req.params.id;

        Usuario.findOneAndRemove({_id: id}, function(err) {
            if (err) {
                res.json({ sucesso: false, mensagem: 'Falha ao tentar excluir o usuario', erro: err });
            } else {
                res.json({ sucesso: true, mensagem: 'realizado com sucesso' });
            }
        });
    }
};

module.exports = usuarios;