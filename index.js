var coap            = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');
var config          = require('./iot').config;
var sqlite3         = require('sqlite3').verbose();
var _               = require("underscore");
var MongoDBHelper   = require('./lib/mongodb_helper');
var SQLiteHelper    = require('./lib/sqlite_helper');

if (config.db === 'sqlite3') {
    SQLiteHelper.init();
} else if (config.db === "mongodb") {
    MongoDBHelper.init();
}

module.exports =  iotcoap;
module.exports.rest = rest;