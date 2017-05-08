let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/login', (req, res) => {
	res.render('../views/login.jade');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	// res.json({
	// 	token: req.user.id
	// });
	res.redirect('/arion');
});

module.exports = router;
