var coap            = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');
var sqlite3         = require('sqlite3').verbose();
var DBHandler       = require('./lib/db_handler');

DBHandler.init();

module.exports =  iotcoap;
module.exports.rest = rest;