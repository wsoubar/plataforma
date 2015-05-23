var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	nome: String,
	email: { type: String, required: true, unique: true },
	telefone: String,
	senha: String,
    role: {type: String, default: 'usuario', lowercase: true},
    foto: String,
    bio: String,
    ativo: {type: Boolean, default: true},
	data: {type: Date, default: Date.now}
}, { collection: 'usuario' });

module.exports = mongoose.model('Usuario', usuarioSchema);