// app/routes.js
var multer  = require('multer');
var pjson = require('../package.json');
var path = require('path');

var desafioDao = require('./daos/desafioDao');
var usuarioDao = require('./daos/usuarioDao');
var feedDao = require('./daos/feedDao');
var configDao = require('./daos/configuracoesDao');

var tokenMw = require('./tokenMiddleware');
var setup = require('./setup');

module.exports = function(app) {

    // server routes ===========================================================
    app.get('/teste', function(req, res){
        res.json({ mensagem: 'servidor rodando!!', version: pjson.version });
    });

    // prepara aplicação para primeira execução
    app.get('/setup',setup.run);


    /*
     *  ########## consiguração do multer para upload de imagens ##########
     */
    var done = false;
    app.use(multer({ dest: './public/uploads/',
        rename: function (fieldname, filename) {
            return filename+Date.now();
        },
        
        onFileUploadStart: function (file) {
          console.log(file.originalname + ' is starting ...')
        },
        
        onFileUploadComplete: function (file) {
          console.log(file.fieldname + ' uploaded to  ' + file.path)
          done=true;
        }
    }));

    /*
     * ############## APIs ########################
     */
    app.post('/api/photo',function(req,res){
      if(done==true){
        console.log(req.files);
        console.log('req.body', req.body);
        res.json({"sucesso":true, "mensagem":"Upload feito", "model": req.body, "files": req.files});
      }
    });

    /*
    
      ############## APIs ########################

     */
    app.get('/api/feed/limite/:qtd', feedDao.findLimite);
    app.post('/api/usuario', usuarioDao.create);
    app.post('/api/desafio', desafioDao.create);
    app.post('/api/usuario/login', usuarioDao.login);


    // middleware 
    // rotas abaixo desse middleware terão token validado
    // app.use(tokenMw.tokenMid);


    // DESAFIO
    app.put('/api/desafio/:id', desafioDao.update);
    app.get('/api/desafio/:id', desafioDao.findOne);
    app.get('/api/desafio', desafioDao.findAll);
    app.delete('/api/desafio/:id', desafioDao.delete);

    // usuario / participante
    app.put('/api/usuario/:id', usuarioDao.update);
    app.get('/api/usuario/:id', usuarioDao.findOne);
    app.get('/api/usuario', usuarioDao.findAll);
    app.delete('/api/usuario/:id', usuarioDao.delete);

    // FEED
    app.post('/api/feed', feedDao.create);
    app.put('/api/feed/:id', feedDao.update);
    app.get('/api/feed/:id', feedDao.findOne);
//    app.get('/feed/limite/:qtd', feedDao.findLimite);
    app.get('/api/feed', feedDao.findAll);
    app.delete('/api/feed/:id', feedDao.delete);

    // CONFIGURACOES
    app.post('/api/config', configDao.create);
    app.put('/api/config', configDao.update);
    app.get('/api/config', configDao.findOne);


    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
        //res.sendfile('./public/views/index.html');
    });
};