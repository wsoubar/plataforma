var mongoose = require('mongoose');
var Schema          = mongoose.Schema;

var desafioSchema   = new Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true},
	telefone: {type: String, required: true},
	desafio: {type: String, required: true},
    status: {type: String, default: 'novo', required: true, lowercase: true},
	data: {type: Date, default: Date.now},
    anotacoes: [{
        texto: String,
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        data: {type: Date, default: Date.now}
    }]
}, { collection: 'desafio' });

module.exports = mongoose.model('Desafio', desafioSchema);