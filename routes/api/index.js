let express = require('express');
let router = express.Router();
let getInfoRouter = require('./getInfo');
let getElementRouter = require('./getElement');

router.use(getElementRouter);
router.use(getInfoRouter);

module.exports = router;
