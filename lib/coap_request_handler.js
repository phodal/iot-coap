var qh   = require('./coap_query_helper.js');
var _   = require("underscore");

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

request_helper.syncHandler = function (req, res) {
    'use strict';
    switch (req.headers.Accept) {
    case "application/json":
        qh.syncJSON(req, res, parse_buffer(req));
        break;
    }
};

request_helper.getHandler = function (req, res) {
    'use strict';
    switch (req.headers.Accept) {
    case "application/json":
        qh.returnJSON(req, res);
        break;
    }
};

request_helper.deleteHandler = function (req, res) {
    'use strict';
    qh.deleteData(req, res);
};

request_helper.methodNotSupport = function (res, req) {
    'use strict';
    res.end(JSON.stringify({
        message: req.method + " is no support now"
    }));
};

request_helper.errorRequest = function (res) {
    'use strict';
    res.end(JSON.stringify({
        error: "sorry"
    }));
};

request_helper.urlErrorRequest = function (res) {
    'use strict';
    res.end(JSON.stringify({
        errorType: "url"
    }));
};

module.exports = request_helper;