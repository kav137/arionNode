let express = require('express');
let router = express.Router();
let getInfoRouter = require('./getInfo');
let getElementRouter = require('./getElement');

router.get('/getElement', getElementRouter);
router.get('/getInfo', getInfoRouter);

module.exports = router;
