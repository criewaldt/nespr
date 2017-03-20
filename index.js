// PARSE - index.js
var app = require('express')();
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// NESPR CONFIG vars
var nesprCONFIG = require(__dirname + '/config/config.js');

// Set Environment var
var DEPLOY_ENV = nesprCONFIG.DEPLOY_ENV;
console.log('NESPR env: ' +DEPLOY_ENV);

// Postgres - Local, remote, or Heroku - Same auth needed -->
var pg = require('pg');
pg.defaults.ssl = true;
var pgConfig = {
    // These will autopopulate if deployed to Heroku
    user: process.env.PGUSER || nesprCONFIG.PGUSER, //env var: PGUSER
    database: process.env.PGDATABASE || nesprCONFIG.PGDATABASE, //env var: PGDATABASE
    password: process.env.PGPASSWORD || nesprCONFIG.PGPASSWORD, //env var: PGPASSWORD
    host: process.env.PGHOST || nesprCONFIG.PGHOST, // Server hosting the postgres database
    port: process.env.PGPORT || nesprCONFIG.PGPORT, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(pgConfig);
// EXAMPLE: Postgres Query
/*
// To run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool.

// Middleware can be written for this to make it easier
pool.connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});
*/
// -->

// REDIS -->
if (DEPLOY_ENV == "heroku") {
    //REDIS - HEROKU
    console.log('Using Heroku Redis');
    var client = require('redis').createClient(process.env.REDIS_URL);
    client.on('connect', function() {
        console.log('Connected to Heroku Redis');
    });
    app.use(session({
        secret: 'this is my session secret...',
        // create new redis store.
        store: new redisStore({client: client}),
        saveUninitialized: false,
        resave: false
    }));
}
else if (DEPLOY_ENV == "local") {
    // REDIS - LOCAL
    console.log('Using local Redis');
    var client = require('redis').createClient();
    app.use(session({
        secret: 'this is my sessio secret...',
        // create new redis store.
        store: new redisStore({ host: 'localhost', port: 6379, client:client,ttl :  260}),
        saveUninitialized: false,
        resave: false
    }));
}
else {
    console.log('Error with Redis, check your DEPLOY_ENV var in /config/config.js');
}
// -->

// Pug Tempalate Engine
require('pug');
app.set('view engine', 'pug');

// Serve Static Files
app.use(express.static(__dirname + '/public'));

// Set encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Session middleware
function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        req.session.destroy();
        res.redirect('/');
    }
}

// Need login view and create session logic here

// index view
app.get('/', function(req, res) {
    res.send('Index page goes here.');
});

// restricted view test
app.get('/restricted', restricted, function(req, res) {
    res.send('This is a restricted page, but youll never be able to see it because there is no login endpoint & session logic... yet.');
});

// socket view test
app.get('/socket', function(req, res) {
    res.render('socketio');
});

// angular view test
app.get('/angular', function(req, res) {
    //pulled Todo example from AngularJS.org
    res.render('angular');
});

// 404 for any page that doesnt exist - This goes after all other views
app.get('*', function(req, res){
    res.status(404).send("This page doesn't exist... yet");
});

//SocketIO Server -->
io.on('connection', function(socket) {
    
    //SocketIO listeners
    console.log('Client connected.');

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
// -->

//start http listening
http.listen(port, function(){
    console.log('listening on *:' + port);
});
