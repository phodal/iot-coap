const coap             = require('coap')
      ,rest            = require('./server/rest')
      ,iotcoap         = require('./server/coap');

module.exports = iotcoap;
module.exports.rest = rest;
