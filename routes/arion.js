const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '../client/arion')));
router.get('/arion', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/arion/index.html'));
});

module.exports = router;
