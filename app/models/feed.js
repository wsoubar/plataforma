var mongoose = require('mongoose');
var Schema          = mongoose.Schema;

var feedSchema   = new Schema({
	texto: String,
	tipo: {type: String, default: 'comentario'},
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
	data: {type: Date, default: Date.now}
}, { collection: 'feed' });

module.exports = mongoose.model('Feed', feedSchema);