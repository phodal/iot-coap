const qh	= require('./query_helper.js');
const _	= require("underscore");

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
    }
};

coap_helper.getHandler = function(req, res) {
    switch (req.headers['Accept']) {
        case "application/json":
            qh.returnJSON(req, res);
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
coap_helper.post_device = function(req, res){console.log('post_device');};
coap_helper.put_device = function(req, res){console.log('put_device');};
coap_helper.get_device = function(req, res){console.log('get_device');};
coap_helper.del_device = function(req, res){console.log('del_device');};
coap_helper.get_devices = function(req, res){console.log('get_devices');};
coap_helper.post_channel = function(req, res){console.log('post_channel');};
coap_helper.put_channel = function(req, res){console.log('put_channel');};
coap_helper.get_channel = function(req, res){console.log('get_channel');};
coap_helper.del_channel = function(req, res){console.log('del_channel');};
coap_helper.get_channels = function(req, res){console.log('get_channels');};
coap_helper.post_datapoint = function(req, res){console.log('post_datapoint');};
coap_helper.put_datapoint = function(req, res){console.log('put_datapoint');};
coap_helper.get_datapoint = function(req, res){console.log('get_datapoint');};
coap_helper.del_datapoint = function(req, res){console.log('del_datapoint');};
coap_helper.get_datapoints = function(req, res){console.log('get_datapoints');};

module.exports = coap_helper;