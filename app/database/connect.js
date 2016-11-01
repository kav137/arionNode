"use strict";

let neo4j = require("node-neo4j");
let db = new neo4j("http://localhost:7474");

module.exports = db;