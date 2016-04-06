var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config/main');
var app = express();
var port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//current homepage
app.get('/', function(req, res) {
	res.send('root of Purdue Men\'s Rugby Servers.');
});

//log request to console
app.use(morgan('dev'));

//connect to db
mongoose.connect(config.database);

//bring in api router
require('./app/routes')(app);

app.listen(port);
console.log('Your server is running on port ' + port + '.');


