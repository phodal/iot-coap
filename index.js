const coap             = require('coap');
const rest            = require('./server/rest_server');
const iotcoap         = require('./server/coap_server');

module.exports = iotcoap;
module.exports.rest = rest;

iotcoap.run();
iotcoap.rest.run();

