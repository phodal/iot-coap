var coap          = require('coap');
var coapserver    = coap.createServer({});
var URLHandler    = require("../url_handler");

function iotcoap() {
    'use strict';
}

iotcoap.run = function () {
    'use strict';

    var request_handler = require('./coap_request_handler.js');
    coapserver.on('request', function (req, res) {
        if (URLHandler.url_sanity_check(req.url) === false) {
            request_handler.urlErrorRequest(res);
            return;
        }

        switch (req.method) {
        case "GET":
            request_handler.getHandler(req, res);
            break;
        case "POST":
        case "PUT":
            request_handler.postHandler(req, res);
            break;
        case "DELETE":
            request_handler.deleteHandler(req, res);
            break;
        default:
            request_handler.errorRequest(res);
            break;
        }
    });

    coapserver.listen(function () {
        console.log('coap listening at coap://0.0.0.0:5683');
    });
};

iotcoap.close = function () {
    'use strict';
    coapserver.close();
};

module.exports = iotcoap;