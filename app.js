let express = require('express');

let config = require('./config');
let services = require('./services');
let appRouter = require('./routes');

let app = express();

config.configureApp(app);
services.authentication.init();
app.use(appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.redirect('/login');
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


module.exports = app;
