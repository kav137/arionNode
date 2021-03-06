let express = require('express');
let router = express.Router();
const elementService = require('../../services/elementService');

let database = require('../../services').database;

router.get('/getElement', (req, res, next) => {
	console.log('>>> get element route');
	// let className = req.query.cn;
	let groupName = req.query.gn;
	// let methodName = req.query.mt;

	// getIdByGroupName
	(new Promise((resolve, reject) => {
		const coefficientQuery = `match (n:Group) where n.Name = '${groupName}' return id(n)`;
		database.cypherQuery(coefficientQuery, (err, result) => {
			if (err) {
				reject();
			}
			if (result.data.length) {
				// we have to iterate through the data array
				// get metadata id is equal to _id property
				resolve({ id: result.data[0], arr: [] }); // resolve with int id value
			} else {
				console.log('failed while retrieving id by groupName');
				reject();
			}
		});
	}))
		.then(elementService.getAllNodesOutcomingOfId)
		.then(elementService.prettifyElementInfo)
		.then((result) => {
			res.json(result);
		});
});

module.exports = router;
