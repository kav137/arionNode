let express = require('express');
let passport = require('passport');
let path = require('path');

let config = require('./config');
let services = require('./services');
let appRouter = require('./routes');

let app = express();

config.configureApp(app);
services.authentication.init();
app.use(appRouter);

// let middleware = require('./app/index');
// let getInfo = middleware.database.getInfo;
// let getElement = middleware.database.getElement;

// app.get('/login', (req, res) => {
// 	res.render('login.jade');
// });
// app.post('/login',
// 	passport.authenticate('local', { failureRedirect: '/login' }),
// 	function(req, res) {
// 		res.redirect('/arion');
// 	}
// );

// app.use('/arion',
// 	require('connect-ensure-login').ensureLoggedIn(),
// 	express.static(path.join(__dirname, 'public/arion'))
// );

// app.use('/arion', require('connect-ensure-login').ensureLoggedIn(), getInfo);
// app.use('/arion', require('connect-ensure-login').ensureLoggedIn(), getElement);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.redirect('/login');
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


module.exports = app;
