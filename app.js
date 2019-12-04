var express = require('express');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

//connection to database
var mongoDB = "mongodb+srv://Prabin:TurkuFinland@prabin-5muhx.mongodb.net/dummy?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
	useNewUrlParser: true
}).then(() => {
	console.log('Successfully connected to the database');
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/*+json'}));

app.use(express.static(path.join(__dirname + '/static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(expressLayouts);


// Require all the route files
var index = require('./routes/index');

// All the routes from URL
app.use('/', index);

//starting the server
app.listen(3001, function () {
    console.log('Server running at port 3000: http://127.0.0.1:3001');
});

module.exports = app;
