var mongoose = require('mongoose');
var Schema          = mongoose.Schema;

var desafioSchema   = new Schema({
	nome: String,
	email: String,
	telefone: String,
	desafio: String,
	data: {type: Date, default: Date.now}
}, { collection: 'desafio' });

module.exports = mongoose.model('Desafio', desafioSchema);