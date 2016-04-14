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
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	hometown: {
		type: String,
		required: true
	},
	homestate: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Player', PlayerSchema);
