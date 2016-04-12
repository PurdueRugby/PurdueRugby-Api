var mongoose = require('mongoose')

var CalendarEventSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	result: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);
