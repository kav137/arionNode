const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/arion', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/arion/index.html'));
});

module.exports = router;
