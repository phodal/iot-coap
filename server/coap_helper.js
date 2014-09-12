const qh	= require('./query_helper.js')
const _		= require("underscore");

function coap_helper(){

}

function parse_buffer(req) {
    var block_save = [];
    _.each(req.options, function (e) {
        if (e["name"] === "Block2") {
            block_save.push(_.values(e).toString().split(',')[1]);
        }
    });
    return block_save;
}

coap_helper.syncHandler = function (req, res) {
    switch (req.headers['Accept']) {
        case "application/json":
            qh.syncJSON(req, res, parse_buffer(req));
            break;
        case "application/xml":
            qh.postXML(req, res, parse_buffer(req));
            break;
    }
};

coap_helper.getHandler = function(req, res) {
    switch (req.headers['Accept']) {
        case "application/json":
            qh.returnJSON(req, res);
            break;
        case "application/xml":
            qh.returnXML(req, res);
            break;
    }
};

coap_helper.deleteHandler = function(req, res){
    qh.deleteData(req, res);
};

coap_helper.methodNotSupport = function(res, req) {
    res.end(JSON.stringify({
        message: req.method + " is no support now"
    }));
};

coap_helper.errorRequest = function(res) {
    res.end(JSON.stringify({
        error: "sorry"
    }));
};

coap_helper.urlErrorRequest = function(res) {
    res.end(JSON.stringify({
        errorType: "url"
    }));
};

module.exports = coap_helper;