const coap             = require('coap')
      ,rest            = require('./server/rest')
      ,iotcoap         = require('./server/coap')
      ,iotsocket       = require('./server/iot_socket');

module.exports = iotcoap;
module.exports.rest = rest;
module.exports.iotsocket = iotsocket;