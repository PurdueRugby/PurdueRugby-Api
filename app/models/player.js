var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var PlayerSchema = new mongoose.Schema({
	name : {
		type: String,
		unique: true,
		require: true
	},
	position: {
		type: String,
		required: true
	},
	hometown: {
		type: String,
		require: false
	},
	year: {
		type: String,
		require: false
	}
});

module.exports = mongoose.model('Player', PlayerSchema);
