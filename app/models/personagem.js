// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema       = mongoose.Schema;
var PersonagemSchema   = new Schema({
	name: String
}, { collection: 'Personagem' });
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = mongoose.model('Personagem', {
//    name : {type : String, default: ''}
//});



module.exports = mongoose.model('Personagem', PersonagemSchema);