"use strict";

var records = [
    { id: 1, username: 'admin', password: '123', displayName: 'Jack', emails: [ { value: 'jack@example.com' }] }
    , { id: 2, username: 'test', password: 'test123', displayName: 'Jill', emails: [ { value: 'jill@example.com' }] }
];

exports.findById = function ( id, cb ) {
    process.nextTick( function () {
        var idx = id - 1;
        if ( records[ idx ] ) {
            cb( null, records[ idx ] );
        } else {
            cb( new Error( 'User ' + id + ' does not exist' ) );
        }
    });
}

exports.findByUsername = function ( username, cb ) {
    process.nextTick( function () {
        for ( var i = 0, len = records.length; i < len; i++ ) {
            var record = records[ i ];
            if ( record.username === username ) {
                return cb( null, record );
            }
        }
        return cb( null, null );
    });
}

// let users = [
//     {
//         "id": 1,
//         "username": "testUser",
//         "password": "test"
//     },
//     {
//         "id": 2,
//         "username": "admin",
//         "password": "123"
//     }
// ];

// let getUser = ( {username, password}) => {
//     let foundUsers = users.filter(( item ) => item.username === username && item.password === password );
//     return ( foundUsers.length === 1 ) ? foundUsers[ 0 ] : null;
// }

// module.exports = getUser;