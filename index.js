var coap            = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');
var DB_Factory      = require("./lib/db_factory");

var db_factory = new DB_Factory();
var database = db_factory.selectDB();
database.init();

module.exports =  iotcoap;
module.exports.rest = rest;