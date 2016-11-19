"use strict";

let db = require( "./connect" );


let getAllNodesOutcomingOfId = ( {id, arr}) => {
    console.log( `getAllNodesOutcomingOfId( id : ${id} )` );
    const query = `start n=node(${id}) match path=n-[]->res return res`;
    // let outNode = {};

    let resultPromise = new Promise(( resolve, reject ) => {
        db.cypherQuery( query, ( err, result ) => {
            if ( err ) {
                console.log( `error : ${query}` );
                reject();
            }
            //result.data is originArray. iterate through it
            //dataItem is currentOutcomingNode
            let arrayOfPromises = [];
            result.data.forEach( dataItem => {
                let label = "UNDEF";
                arr.push( dataItem );
                arrayOfPromises.push(
                    ( new Promise(( resolve, reject ) => {
                        db.readLabels( dataItem._id, ( err, result ) => {
                            if ( err ) {
                                console.log( `readLabels error. id : ${id}` );
                                reject();
                            }
                            resolve( result[ 0 ] );
                        })
                    }) )
                        .then(( labelName = "UNDEF" ) => {
                            label = labelName;
                            dataItem.label = labelName;
                            dataItem[ label ] = [];
                            return { id: dataItem._id, arr: dataItem[ label ] };
                        })
                        .then( getAllNodesOutcomingOfId )
                        .then(() => {
                            // if ( !dataItem[ label ].length ) {
                            //     dataItem[ label ] = undefined;
                            // }

                            //workable (almost)
                            let length = dataItem[ label ].length
                            if ( length ) {
                                dataItem[dataItem[ label ][dataItem[ label ].length -1 ].label] = dataItem[ label ];
                            }
                            dataItem[ label ] = undefined;
                        })
                );
            });
            Promise.all( arrayOfPromises ).then( value => {
                resolve( value );
            })
        })
    });

    return resultPromise.then(() => arr );
}

let getLabelByNodeId = ( id ) => {
    return new Promise(( resolve, reject ) => {
        db.readLabels( id, ( err, result ) => {
            if ( err ) {
                console.log( `readLabels error. id : ${id}` );
                reject();
            }
            resolve( result[ 0 ] );
        })
    })
}


// ( result ) => {
//     const query = `start n=node(${result}) match path=n-[]->res return res`;
//     return new Promise(( resolve, reject ) => {
//         db.cypherQuery( query, ( err, result ) => {
//             if ( err ) {
//                 reject();
//             }
//             if ( result.data.length ) {
//                 resolve( result.data );
//             }
//             else {
//                 console.log( "failed while params by id" );
//                 reject();
//             }
//         })
//     })
// }
module.exports = getAllNodesOutcomingOfId;