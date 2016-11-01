"use strict";
let express = require("express");
let router = express.Router();

let sampleAnswer = {
	"data": {
		"auth" : true,
		"description" : "You have been successfully logged in"
	}
}

router.get("/login", (req, res, next) => {
	res.json(sampleAnswer);
	console.log("logged in");
});

module.exports = router;