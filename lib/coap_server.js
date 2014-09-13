var coap             = require('coap');
var coapserver      = coap.createServer({});
var fs              = require('fs');
var file            = './iot.json';
var _               = require('underscore');

function iotcoap() {
    'use strict';
    return;
}

iotcoap.run = function () {
    'use strict';

    function startIOT(config) {
        function url_sanity_check(url) {
            if (url.split('/')[2] === false) {
                return false;
            }
            _.each(config["key"], function (array, index) {
                if (url.split('/')[1] === config["key"][index]) {
                    return true;
                }
            });
        }

        var request_handler = require('./request_handler.js');
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
                request_handler.syncHandler(req, res);
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
    }

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        var config = JSON.parse(data);
        module.exports.config = config;

        startIOT(config);
    });
};

module.exports = iotcoap;