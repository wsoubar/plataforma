// config.js
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var configSchema    = new Schema({
    videoHackathon: String,
    tema: {type: String, default: 'united'}
}, { collection: 'configuracoes' });

module.exports = mongoose.model('Configuracoes', configSchema);