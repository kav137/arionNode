let express = require('express');
let router = express.Router();

let getInfo = () => { 123; };

router.get('/', (req, res, next) => {
	let result = getInfo();
	res.json(result);
});

module.exports = router;
