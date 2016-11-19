"use strict";

let express = require( "express" );
let bodyParser = require( "body-parser" );
let db = require( "./connect" );
let getAllNodesOutcomingOfId = require( "./getAllNodesOutcomingOfId" );
let prettifyElementInfo = require("../utils/prettifyElementInfo");
let router = express.Router();


router.use( bodyParser.json() );

router.get( "/getElement", ( req, res, next ) => {
    req;
    let className = req.query.cn;
    let groupName = req.query.gn;
    let methodName = req.query.mt;

    //getIdByGroupName
    ( new Promise(( resolve, reject ) => {
        const coefficientQuery = `match (n:Group) where n.Name = '${groupName}' return id(n)`;
        db.cypherQuery( coefficientQuery, ( err, result ) => {
            if ( err ) {
                reject();
            }
            if ( result.data.length ) {
                //we have to iterate through the data array
                //get metadata id is equal to _id property
                resolve( { id : result.data[ 0 ], arr : [] } ); //resolve with int id value
            }
            else {
                console.log( "failed while retrieving id by groupName" );
                reject();
            }
        })
    }) )
        //getAllNodesOutcomingOfId
        .then(getAllNodesOutcomingOfId)
        .then(prettifyElementInfo)
        .then(( result ) => {
            res.json( result );
        });

});

module.exports = router;