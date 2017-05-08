let express = require('express');
let router = express.Router();

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

module.exports = router;