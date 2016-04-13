var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var PlayerSchema = new mongoose.Schema({
	name : {
		type: String,
		unique: true,
		required: true
	},
	height: {
		type: String,
		required: true
	},
	weight: {
		type: int,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	hometown: {
		type: String,
		required: false
	},
	year: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Player', PlayerSchema);
