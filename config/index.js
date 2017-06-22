let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');

function configureApp(app) {
	// view engine setup
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger(':date[iso] :method :url :status :response-time ms - :res[content-length]'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());
}

module.exports = {
	configureApp
};

