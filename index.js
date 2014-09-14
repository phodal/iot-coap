var coap             = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');

module.exports = iotcoap;
module.exports.rest = rest;