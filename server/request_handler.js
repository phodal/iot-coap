var qh              = require('./query_helper.js');
var _               = require("underscore");
var bl              = require('bl');

function request_helper(){

}

request_helper.postHandler = function (req, res) {
    var result = {};
    var block_save = [];

    _.each(req.options, function(e){
        if (e["name"] === "Block2") {
            block = _.values(e).toString();
            block_save.push(block.split(',')[1]);
        }
    });

    if(!_.isEmpty(block_save)){
        var db_index = ["id", "value", "sensors1", "sensors2"];
        var str = "" ;
        str += "{";
        _.each(block_save, function(array, index){
            str += '"' + db_index[index] + '"' +':"' + array + '",' ;
        });
        str = str.substring(0, str.length - 1);
        str += "}";
        result = JSON.parse(str);
    }

    res.code = '2.05';
    res.end(JSON.stringify(result));
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