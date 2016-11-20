"use strict";
let express = require( "express" );
let router = express.Router();



router.use(( req, res, next ) => {
	console.log( `auth proxy; user ${req.query.user}` );
	if ( req.query.user ) {
		let doesExist = users.some(( item ) => {
			return item.username === req.query.user;
		})
		console.log( `does exist : ${doesExist}` );
		next();
	}
	else {
		next( "illegal access" );
	}
})

// router.get("/login", (req, res, next) => {
// 	res.json(sampleAnswer);
// 	console.log("logged in");
// 	next();
// });
// let sampleAnswer = {
// 	"data": {
// 		"auth": true,
// 		"description": "You have been successfully logged in"
// 	}
// }

module.exports = router;