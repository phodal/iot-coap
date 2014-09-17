var coap          = require('coap');
var coapserver    = coap.createServer({});
var _             = require('underscore');
var config        = require("../iot").config;

function iotcoap() {
    'use strict';
    return;
}

iotcoap.run = function () {
    'use strict';

    function url_sanity_check(url) {
        if (url.split('/')[2] === false) {
            return false;
        }
        _.each(config.keys, function (array, index) {
            if (url.split('/')[1] === config.keys[index]) {
                return true;
            }
        });
    }

    var request_handler = require('./coap_request_handler.js');
    coapserver.on('request', function (req, res) {
        if (url_sanity_check(req.url) === false) {
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