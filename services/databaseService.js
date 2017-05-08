'use strict';

let Neo4j = require('node-neo4j');
let db = new Neo4j('http://localhost:7474');

module.exports = db;
