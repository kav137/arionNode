var passport = require('passport');
var Strategy = require('passport-local').Strategy;

function findUser({ username, password, id }) {
	let users = [
		{
			id: 1,
			username: 'admin',
			password: '123'
		},
		{
			id: 2,
			username: 'student',
			password: 'student'
		}
	];
	return new Promise(function(resolve, reject) {
		let resultUser = users.find((user) => {
			return (user.id === id) || (user.username === username && user.password === password);
		});
		resultUser ? resolve(resultUser) : reject('requested user not found');
	});
}

function init() {
	passport.use(new Strategy(
		function(username, password, done) {
			findUser({
				username,
				password
			}).then((foundUser) => {
				return done(null, foundUser);
			}).catch((error) => {
				return done(null, false, error);
			});
		})
	);

	passport.serializeUser((sessionUser, cb) => {
		cb(null, sessionUser.id);
	});

	passport.deserializeUser((id, cb) => {
		findUser({ id }).then((user) => {
			cb(null, user);
		});
	});
}

module.exports = { init };


