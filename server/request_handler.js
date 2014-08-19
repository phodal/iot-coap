var qh              = require('./query_helper.js');
var _               = require("underscore");
var bl              = require('bl');

function request_helper(){

}

request_helper.syncHandler = function (req, res) {
    var block_save = [];
    _.each(req.options, function(e){
        if (e["name"] === "Block2") {
            block_save.push(_.values(e).toString().split(',')[1]);
        }
    });

    switch (req.headers['Accept']) {
        case "application/json":
            qh.syncJSON(req, res, block_save);
            break;
        case "application/xml":
            qh.postXML(req, res, block_save);
            break;
    }
};

request_helper.getHandler = function(req, res) {
    switch (req.headers['Accept']) {
        case "application/json":
            qh.returnJSON(req, res);
            break;
        case "application/xml":
            qh.returnXML(req, res);
            break;
    }
};

request_helper.methodNotSupport = function(res, req) {
    res.end(JSON.stringify({
        message: req.method + " is no support now"
    }));
};
request_helper.errorRequest = function(res) {
    res.end(JSON.stringify({
        error: "sorry"
    }));
};

module.exports = request_helper;