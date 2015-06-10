// desafioDao.js
var mongoose     = require('mongoose');
var Usuario      = require('../models/usuario');
var jwt          = require("jsonwebtoken");
var config       = require('../../config/config');
var passwordHash = require('password-hash');

var usuarios = {
    // cria um novo usuario
    create  : function(req, res) {

        //console.log('senha', req);

        var user = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: passwordHash.generate(req.body.senha)
        });
        console.log(user);

        Usuario.findOne({email: user.email}, function(err, usuario){
            if (err) {
                res.json({ sucesso: false, mensagem: 'Erro desconhecido', erro: err });
            } else {
                if (usuario) {
                    res.json({ sucesso: false, mensagem: 'Usuário com esse email já cadastrado!', erro: {mensagem: 'Falha ao tentar criar um novo usuário'} });
                } else {
                    user.save(function(err) {
                        if (err) {
                            res.json({ sucesso: false, mensagem: 'Falha ao tentar criar um novo usuário', erro: err });
                        } else {
                            res.json({ sucesso: true, mensagem: 'realizado com sucesso', usuario: user });
                        }
                    });
                }
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

        Usuario.findOne({email: email }, function(err, user) {
            //if (err) throw err;
            if (user) {
                if (passwordHash.verify(senha, user.senha)) {
                    // user.token = jwt.sign(user, jwtSecret);
                    var token = jwt.sign(user, config.jwtSecret, {
                      expiresInMinutes: 1440 // expires in 24 hours
                    });
                    res.json({ sucesso: true, mensagem: 'Login realizado com sucesso', usuario: user, token: token });
                } else {
                    res.json({ sucesso: false, mensagem: 'Usuário ou senha inválidos'});    
                }
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
            senha: req.body.senha, 
            role: req.body.role,
            foto: req.body.foto,
            bio: req.body.bio,
            ativo: req.body.ativo
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