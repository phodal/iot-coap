var coap            = require('coap');
var rest            = require('./lib/rest/rest_server');
var iotcoap         = require('./lib/coap/coap_server');
var DB_Factory      = require("./lib/database/db_factory");

var db_factory = new DB_Factory();
var database = db_factory.selectDB();
database.init({});

module.exports =  iotcoap;
module.exports.rest = rest;