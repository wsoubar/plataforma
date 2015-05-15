var mongoose = require('mongoose');
var Schema          = mongoose.Schema;

var usuarioSchema   = new Schema({
	nome: String,
	email: String,
	telefone: String,
	senha: String,
	data: {type: Date, default: Date.now}
}, { collection: 'usuario' });

module.exports = mongoose.model('Usuario', usuarioSchema);