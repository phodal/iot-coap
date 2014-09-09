const coap             = require('coap');
const rest            = require('./server/rest');
const iotcoap         = require('./server/coap');

module.exports = iotcoap;
module.exports.rest = rest;

iotcoap.run();
iotcoap.rest.run();

