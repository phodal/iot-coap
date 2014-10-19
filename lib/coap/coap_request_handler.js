var qh     = require('./coap_query_helper.js');
var _      = require("underscore");
var ER     = require('../ErrorMessage');

function request_helper() {
    'use strict';
    return;
}

function parse_buffer(req) {
    'use strict';
    var block_save = [];
    _.each(req.options, function (e) {
        if (e.name === "Block2") {
            block_save.push(_.values(e).toString().split(',')[1]);
        }
    });
    return block_save;
}

request_helper.postHandler = function (req, res) {
    'use strict';
    switch (req.headers.Accept) {
        case "application/json":
            qh.postJSON(req, res, parse_buffer(req));
            break;
        default:
            request_helper.acceptNotSupport(req, res);
            break;
    }
};

request_helper.getHandler = function (req, res) {
    'use strict';
    switch (req.headers.Accept) {
        case "application/json":
            qh.getJSON(req, res);
            break;
        default:
            request_helper.acceptNotSupport(req, res);
            break;
    }
};

request_helper.deleteHandler = function (req, res) {
    'use strict';
    switch (req.headers.Accept) {
        case "application/json":
            qh.deleteJSON(req, res);
            break;
        default:
            request_helper.acceptNotSupport(req, res);
            break;
    }
};

request_helper.methodNotSupport = function (res, req) {
    'use strict';
    res.end(JSON.stringify({
        message: req.method + " is no support now"
    }));
};

request_helper.errorRequest = function (res) {
    'use strict';
    res.end(JSON.stringify(ER.ERRORREQUEST));
};

request_helper.urlErrorRequest = function (res) {
    'use strict';
    res.end(JSON.stringify(ER.URLERROR));
};

request_helper.acceptNotSupport = function (req, res) {
    'use strict';
    console.log(req.headers.Accept);
    res.end(JSON.stringify({
        accept: req.headers.Accept,
        error: "accept not support"
    }));
};

module.exports = request_helper;