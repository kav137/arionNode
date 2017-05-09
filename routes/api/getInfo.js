let databaseService = require('../../services/databaseService');
let express = require('express');
let router = express.Router();

const methods = {
	native: 'Отечественные компоненты',
	foreign: 'Зарубежные компоненты'
};

router.get('/getInfo', (req, res, next) => {
	databaseService.cypherQuery('match (n:Class) return n', (classErr, classResult) => {
		if (classErr) {
			console.log('err while retrieving classes from db');
			res.status(500);
		}

		let promiseArray = classResult.data.map((classItem) => {
			return new Promise((resolve, reject) => {
				const nativeQuery = `match (n:Class)-[]->(m:Owner)-[]->group where n.Name = '${classItem.Name}' and m.Name = '${methods.native}' return group`;
				databaseService.cypherQuery(nativeQuery, (groupErr, groupResult) => {
					if (groupErr) {
						reject();
					}
					let retObject = {
						groups: [],
						className: [classItem.Name]
					};
					retObject.groups.push({
						native: [
							{
								groupName: groupResult.data.map((item) => item.Name)
							}
						]
					});
					resolve(retObject);
				});
			}).then((result) => {
				return new Promise((resolve, reject) => {
					const foreignQuery = `match (n:Class)-[]->(m:Owner)-[]->group where n.Name = '${classItem.Name}' and m.Name = '${methods.foreign}' return group`;
					databaseService.cypherQuery(foreignQuery, (groupErr, groupResult) => {
						if (groupErr) {
							reject();
						}
						result.groups[0].foreign = [
							{
								groupName: groupResult.data.map((item) => item.Name)
							}
						];
						resolve(result);
					});
				});
			});
		});

		Promise.all(promiseArray).then((result) => {
			res.json({ data: result });
		});
	});
});

module.exports = router;

