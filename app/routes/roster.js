var express = require('express');
var config = require('../../config/main');

var Player = require('../models/player');

module.exports = function(app) {
	var rosterRoutes = express.Router();
	/*
	 * Roster Routes
	 *
	 */
	//retrieve all players from roster
	rosterRoutes.get('/', function(req, res) {
		Player.find(function(err, roster) {
			if(err)
				return res.send({ success: false, message: err });
			res.send(roster);
		});
	});

	//add new player to roster
	rosterRoutes.post('/register', function(req, res) {
		if(!req.body.name || !req.body.position || !req.body.hometown || !req.body.year)
			res.json({ success: false, message: 'Username, position, hometown, or year not present.' });
		else {
			var newUser = new Player({
				name: req.body.name,
				position: req.body.position,
				hometown: req.body.hometown,
				year: req.body.year
			});

			newUser.save(function(err) {
				if (err) {
					return res.json({ success: false, message: 'That name already exists.' });
				}
				res.json({ success: true, message: 'Successfully added ' + newUser.name});
			});
		}
	});



	//get info for player
	rosterRoutes.get('/:player_id', function(req, res) {
		Player.findOne({_id: req.params.player_id}, function(err, player) {
			if(err)
				res.send(err);
			if(!player)
				return res.send({ success: false, message: 'player not found'});
			res.send(player);

		});

	});

	//edit player info
	rosterRoutes.put('/:player_id', function(req, res) {
		Player.findOne({ _id: req.params.player_id}, function(err, player) {
			if(err)
				res.send(err);
			if(!player)
				return res.send({ success: false, message: 'player not found'});
			var newInfo = req.body;
			player.name = newInfo.name;
			player.position = newInfo.position;
			player.hometown = newInfo.hometown;
			player.year = newInfo.year;
			player.save(function(err) {
				if(err)
					res.send(err);
				res.json({message: player.name + ' edited' });
			});
		});
	});
	//delete player from roster
	rosterRoutes.delete('/:player_id', function(req, res) {
		Player.findOneAndRemove({ _id: req.params.player_id}, function(err) {
			if(err)
				res.send(err);
			res.json({message: 'Player  deleted' });
		});
	});

	app.use('/roster', rosterRoutes);
}

