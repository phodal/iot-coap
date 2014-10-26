var qh     = require('./coap_query_helper.js');
var _      = require("underscore");
var ER     = require('../ErrorMessage');

function request_helper() {
    'use strict';
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

request_helper.choiceResult = function(accept, callback){
    'use strict';
    if(accept === "application/json"){
        if(typeof callback === 'function'){
            callback();
        }
    }
};

request_helper.postHandler = function (req, res) {
    'use strict';
    request_helper.choiceResult(req.headers.Accept, qh.postJSON(req, res, parse_buffer(req)));
};

request_helper.getHandler = function (req, res) {
    'use strict';
    request_helper.choiceResult(req.headers.Accept, qh.getJSON(req, res));
};

request_helper.deleteHandler = function (req, res) {
    'use strict';
    request_helper.choiceResult(req.headers.Accept, qh.deleteJSON(req, res));
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

module.exports = request_helper;