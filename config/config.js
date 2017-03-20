//config.js

//CONFIG vars
var PGUSER = 'user'; // Postgres user
var PGDATABASE = 'database'; // Postgres db
var PGPASSWORD = 'password'; //  Postgres password
var PGHOST = 'host'; // Postgres host
var PGPORT = 5432; // Postgres port
var DEPLOY_ENV = 'local'; // 'local' or 'heroku'

module.exports.PGUSER = PGUSER;
module.exports.PGDATABASE = PGDATABASE;
module.exports.PGPASSWORD = PGPASSWORD;
module.exports.PGHOST = PGHOST;
module.exports.PGPORT = PGPORT;
module.exports.DEPLOY_ENV = DEPLOY_ENV;