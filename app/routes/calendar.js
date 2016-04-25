var express = require('express');
var config = require('../../config/main');
var CalendarEvent =  require('../models/calendarEvent');


module.exports = function(app) {
	var calendarRoutes = express.Router();

	/*
	 * Calendar Routes
	 *
	 */
	//retrieve all events from calendar
	calendarRoutes.get('/', function(req, res) {
		CalendarEvent.find(function(err, calendar) {
			if(err)
				return res.send({ success: false, message: err });
			res.send(calendar);
		});
	});

	//add new calendar event
	calendarRoutes.post('/add', function(req,res) {
		if(!req.body.date || !req.body.description || !req.body.result)
			res.json({ success: false, message: 'Date, description, or result no present.' });

		else {
			var newEvent = new CalendarEvent({
				date: req.body.date,
				description: req.body.description,
				result: req.body.result
			});

			newEvent.save(function(err) {
				if(err)
					return res.json({success: false, message: 'event was not added'});
				res.json({success: true, message: newEvent.description + ' successfully added'});
			});
		}
	});


	//get info for calendar event
	calendarRoutes.get('/:event_id', function(req, res) {
		CalendarEvent.findOne({_id: req.params.event_id}, function(err, cEvent) {
			if(err)
				res.send(err);
			if(!cEvent)
				return res.send({ success: false, message: 'event not found'});
			res.send(cEvent);
		});
	});


	//edit calendar event
	calendarRoutes.put('/:event_id', function(req, res) {
		CalendarEvent.findOne({ _id: req.params.event_id}, function(err, cEvent) {
			if(err)
				res.send(err);
			if(!cEvent)
				return res.send({ success: false, message: 'event not found'});
			var newInfo = req.body;
			cEvent.date = newInfo.date;
			cEvent.description = newInfo.description;
			cEvent.save(function(err) {
				if(err)
					res.send(err);
				res.json({message: cEvent.description + ' edited' });
			});
		});
	});

	//delete player from roster
	calendarRoutes.delete('/:event_id', function(req, res) {
		CalendarEvent.findOneAndRemove({ _id: req.params.event_id}, function(err) {
			if(err)
				res.send(err);
			res.json({message: 'Event  deleted' });
		});
	});

	app.use('/calendar', calendarRoutes);

}

