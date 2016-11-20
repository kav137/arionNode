"use strict";
let express = require( 'express' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
let logger = require( 'morgan' );
let cookieParser = require( 'cookie-parser' );
let bodyParser = require( 'body-parser' );
let passport = require( "passport" );
let Strategy = require( "passport-local" ).Strategy;
let usersDb = require( "./config/users" );

passport.use( new Strategy(
    ( username, password, cb ) => {
        usersDb.findByUsername( username, ( err, user ) => {
            if ( err ) { return cb( err ); }
            if ( !user ) { return cb( null, false ); }
            if ( user.password != password ) { return cb( null, false ); }
            return cb( null, user );
        });
    }) );

passport.serializeUser(( user, cb ) => {
    cb( null, user.id );
});

passport.deserializeUser(( id, cb ) => {
    usersDb.findById( id, ( err, user ) => {
        if ( err ) { return cb( err ); }
        cb( null, user );
    });
});

let middleware = require( "./app/index" );
let authentication = middleware.authentication;
let getInfo = middleware.database.getInfo;
let getElement = middleware.database.getElement;

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', "jade" );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( ":date[iso] :method :url :status :response-time ms - :res[content-length]" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false }) );
app.use( cookieParser() );

app.use( require( 'express-session' )( { secret: 'keyboard cat', resave: false, saveUninitialized: false }) );
app.use( passport.initialize() );
app.use( passport.session() );


app.get( '/login', ( req, res ) => {
    console.log( `1` );
    res.render( 'login' );
});
// app.get( "*", ( req, res ) => {
//     res.redirect( "/login" );
// })
app.post( '/login',
    passport.authenticate( 'local', { failureRedirect: '/login' }),
    function ( req, res ) {
        res.redirect( '/arion' );
    });

app.use( "/arion",
    require( 'connect-ensure-login' ).ensureLoggedIn(),
    express.static( path.join( __dirname, 'public/arion' ) )
);
// app.use( "*", passport.authenticate( 'local', { failureRedirect: '/login' }) );
// app.use( ( req, res ) => {
//     res.redirect( "/kek" );
// });

// passport.authenticate( 'local', { failureRedirect: '/login' })

app.use( "/arion", require( 'connect-ensure-login' ).ensureLoggedIn(), getInfo );
app.use( "/arion", require( 'connect-ensure-login' ).ensureLoggedIn(), getElement );


// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
});

// error handler
app.use( function ( err, req, res, next ) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 404 );
    res.render( 'error', {
        message: err,
        error: {
            status: 403

        }
    });
});

module.exports = app;
