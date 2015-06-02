var jwt      = require("jsonwebtoken");
var config   = require('../config/config');

var middleware = {
    
    tokenMid  : function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['X-Auth-Token'];

        console.log('headers', req.headers);

        console.log('TOKEN SERVER', token);

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.jwtSecret, function(err, decoded) {      
                if (err) {
                    return res.json({ sucesso: false, mensagem: 'Falha ao autenticar token.' });    
                } else {
                    // decodifica o usuario e coloca no request para uso das rotas
                    req.decoded = decoded;   
                    //console.log('token decoded', decoded); 
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            /*
            return res.status(401).send({ 
                successo: false, 
                mensagem: 'No token provided.' 
            });
            */
             next();
        }
    }
};

module.exports = middleware;