var mongoose = require('mongoose');
var Schema          = mongoose.Schema;

var desafioSchema   = new Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true},
	telefone: {type: String, required: true},
	desafio: {type: String, required: true},
    status: {type: String, default: 'enviado', required: true, lowercase: true},
	data: {type: Date, default: Date.now}
}, { collection: 'desafio' });

module.exports = mongoose.model('Desafio', desafioSchema);